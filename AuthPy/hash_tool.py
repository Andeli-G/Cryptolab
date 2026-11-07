#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
hash_tool.py - Calcul de hash avec choix de la construction et de la fonction.

Constructions disponibles (implémentées à la main, sans hashlib) :
  - Merkle-Damgard : MD5, SHA-1, SHA-256, SHA-512
  - Keccak (éponge) : SHA3-224/256/384/512, Keccak-256/512 (original), SHAKE128/256

Utilisation :
  python hash_tool.py                       -> mode interactif
  python hash_tool.py -c md -a sha256 -t "bonjour"
  python hash_tool.py -c keccak -a sha3-256 -f fichier.bin
  python hash_tool.py -c keccak -a shake128 -t "abc" -l 64
  python hash_tool.py --test                -> compare avec hashlib
"""
import argparse
import math
import sys

M32 = 0xFFFFFFFF


def rotl(x, n, w):
    return ((x << n) | (x >> (w - n))) & ((1 << w) - 1)


def rotr(x, n, w):
    return ((x >> n) | (x << (w - n))) & ((1 << w) - 1)


# =====================================================================
#  CONSTRUCTION DE MERKLE-DAMGARD
# =====================================================================
class MerkleDamgard:
    """
    Schéma générique : padding (bit 1, zéros, longueur du message en bits),
    découpage en blocs, puis chaînage  H_i = compress(H_{i-1}, M_i)
    à partir d'un vecteur d'initialisation (IV).
    """

    def __init__(self, nom, taille_bloc, taille_longueur, endian_longueur,
                 iv, compress, taille_mot, endian_sortie):
        self.nom = nom
        self.B = taille_bloc
        self.L = taille_longueur
        self.endian_longueur = endian_longueur
        self.iv = iv
        self.compress = compress
        self.taille_mot = taille_mot
        self.endian_sortie = endian_sortie

    def padding(self, data):
        k = (-(len(data) + 1 + self.L)) % self.B
        return (data + b"\x80" + b"\x00" * k
                + (8 * len(data)).to_bytes(self.L, self.endian_longueur))

    def digest(self, data):
        m = self.padding(data)
        etat = list(self.iv)
        for i in range(0, len(m), self.B):
            etat = self.compress(etat, m[i:i + self.B])
        return b"".join(w.to_bytes(self.taille_mot, self.endian_sortie)
                        for w in etat)


# ---------- MD5 ----------
_MD5_S = [7, 12, 17, 22] * 4 + [5, 9, 14, 20] * 4 + [4, 11, 16, 23] * 4 + [6, 10, 15, 21] * 4
_MD5_K = [int(abs(math.sin(i + 1)) * 2 ** 32) & M32 for i in range(64)]


def md5_compress(etat, bloc):
    X = [int.from_bytes(bloc[4 * i:4 * i + 4], "little") for i in range(16)]
    a, b, c, d = etat
    for i in range(64):
        if i < 16:
            f, g = (b & c) | (~b & d), i
        elif i < 32:
            f, g = (d & b) | (~d & c), (5 * i + 1) % 16
        elif i < 48:
            f, g = b ^ c ^ d, (3 * i + 5) % 16
        else:
            f, g = c ^ (b | (~d & M32)), (7 * i) % 16
        f = (f + a + _MD5_K[i] + X[g]) & M32
        a, d, c = d, c, b
        b = (b + rotl(f, _MD5_S[i], 32)) & M32
    return [(s + v) & M32 for s, v in zip(etat, (a, b, c, d))]


# ---------- SHA-1 ----------
def sha1_compress(etat, bloc):
    w = [int.from_bytes(bloc[4 * i:4 * i + 4], "big") for i in range(16)]
    for i in range(16, 80):
        w.append(rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1, 32))
    a, b, c, d, e = etat
    for i in range(80):
        if i < 20:
            f, k = (b & c) | (~b & d), 0x5A827999
        elif i < 40:
            f, k = b ^ c ^ d, 0x6ED9EBA1
        elif i < 60:
            f, k = (b & c) | (b & d) | (c & d), 0x8F1BBCDC
        else:
            f, k = b ^ c ^ d, 0xCA62C1D6
        t = (rotl(a, 5, 32) + f + e + k + w[i]) & M32
        a, b, c, d, e = t, a, rotl(b, 30, 32), c, d
    return [(x + y) & M32 for x, y in zip(etat, (a, b, c, d, e))]


# ---------- SHA-2 (256 / 512) ----------
def _premiers(n):
    p, c = [], 2
    while len(p) < n:
        if all(c % q for q in p if q * q <= c):
            p.append(c)
        c += 1
    return p


def _racine_cubique_entiere(n):
    lo, hi = 0, 1 << (n.bit_length() // 3 + 2)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if mid ** 3 <= n:
            lo = mid
        else:
            hi = mid - 1
    return lo


def _fabrique_sha2(w, nb_tours, rot):
    """Constantes dérivées des racines des nombres premiers (spec FIPS 180-4)."""
    masque = (1 << w) - 1
    P = _premiers(nb_tours)
    K = [_racine_cubique_entiere(p << (3 * w)) & masque for p in P]
    IV = [math.isqrt(p << (2 * w)) & masque for p in P[:8]]
    wb = w // 8
    S0 = lambda x: rotr(x, rot[0], w) ^ rotr(x, rot[1], w) ^ rotr(x, rot[2], w)
    S1 = lambda x: rotr(x, rot[3], w) ^ rotr(x, rot[4], w) ^ rotr(x, rot[5], w)
    s0 = lambda x: rotr(x, rot[6], w) ^ rotr(x, rot[7], w) ^ (x >> rot[8])
    s1 = lambda x: rotr(x, rot[9], w) ^ rotr(x, rot[10], w) ^ (x >> rot[11])

    def compress(etat, bloc):
        W = [int.from_bytes(bloc[wb * i:wb * i + wb], "big") for i in range(16)]
        for i in range(16, nb_tours):
            W.append((s1(W[i - 2]) + W[i - 7] + s0(W[i - 15]) + W[i - 16]) & masque)
        a, b, c, d, e, f, g, h = etat
        for i in range(nb_tours):
            t1 = (h + S1(e) + ((e & f) ^ (~e & g)) + K[i] + W[i]) & masque
            t2 = (S0(a) + ((a & b) ^ (a & c) ^ (b & c))) & masque
            h, g, f, e, d, c, b, a = g, f, e, (d + t1) & masque, c, b, a, (t1 + t2) & masque
        return [(x + y) & masque for x, y in zip(etat, (a, b, c, d, e, f, g, h))]

    return IV, compress


_IV256, _C256 = _fabrique_sha2(32, 64, (2, 13, 22, 6, 11, 25, 7, 18, 3, 17, 19, 10))
_IV512, _C512 = _fabrique_sha2(64, 80, (28, 34, 39, 14, 18, 41, 1, 8, 7, 19, 61, 6))

MD_ALGOS = {
    "md5": MerkleDamgard("MD5", 64, 8, "little",
                         [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476],
                         md5_compress, 4, "little"),
    "sha1": MerkleDamgard("SHA-1", 64, 8, "big",
                          [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],
                          sha1_compress, 4, "big"),
    "sha256": MerkleDamgard("SHA-256", 64, 8, "big", _IV256, _C256, 4, "big"),
    "sha512": MerkleDamgard("SHA-512", 128, 16, "big", _IV512, _C512, 8, "big"),
}


# =====================================================================
#  CONSTRUCTION KECCAK (EPONGE)
# =====================================================================
def _constantes_keccak():
    def lfsr(t):
        R = 1
        for _ in range(t % 255):
            R <<= 1
            if R & 0x100:
                R ^= 0x171
        return R & 1

    RC = []
    for ir in range(24):
        c = 0
        for j in range(7):
            if lfsr(j + 7 * ir):
                c |= 1 << ((1 << j) - 1)
        RC.append(c)

    ROT = [0] * 25
    x, y = 1, 0
    for t in range(24):
        ROT[x + 5 * y] = ((t + 1) * (t + 2) // 2) % 64
        x, y = y, (2 * x + 3 * y) % 5
    return RC, ROT


_RC, _ROT = _constantes_keccak()


def keccak_f1600(A):
    """Permutation Keccak-f[1600] sur 25 lanes de 64 bits (indice x + 5y)."""
    for rnd in range(24):
        # theta
        C = [A[x] ^ A[x + 5] ^ A[x + 10] ^ A[x + 15] ^ A[x + 20] for x in range(5)]
        D = [C[(x - 1) % 5] ^ rotl(C[(x + 1) % 5], 1, 64) for x in range(5)]
        A = [A[i] ^ D[i % 5] for i in range(25)]
        # rho + pi
        B = [0] * 25
        for x in range(5):
            for y in range(5):
                B[y + 5 * ((2 * x + 3 * y) % 5)] = rotl(A[x + 5 * y], _ROT[x + 5 * y], 64)
        # chi
        A = [B[x + 5 * y] ^ ((~B[(x + 1) % 5 + 5 * y]) & B[(x + 2) % 5 + 5 * y])
             for y in range(5) for x in range(5)]
        # iota
        A[0] ^= _RC[rnd]
    return A


def eponge(data, debit, suffixe, longueur_sortie):
    """Éponge : absorption (XOR + permutation) puis essorage."""
    etat = [0] * 25
    m = bytearray(data) + bytes([suffixe])
    while len(m) % debit:
        m.append(0)
    m[-1] |= 0x80
    for off in range(0, len(m), debit):
        bloc = m[off:off + debit]
        for i in range(debit // 8):
            etat[i] ^= int.from_bytes(bloc[8 * i:8 * i + 8], "little")
        etat = keccak_f1600(etat)
    sortie = b""
    while True:
        sortie += b"".join(etat[i].to_bytes(8, "little") for i in range(debit // 8))
        if len(sortie) >= longueur_sortie:
            return sortie[:longueur_sortie]
        etat = keccak_f1600(etat)


# nom : (débit en octets, octet de suffixe/padding, taille de sortie par défaut en octets)
KECCAK_ALGOS = {
    "sha3-224": (144, 0x06, 28),
    "sha3-256": (136, 0x06, 32),
    "sha3-384": (104, 0x06, 48),
    "sha3-512": (72, 0x06, 64),
    "keccak-256": (136, 0x01, 32),   # Keccak original (ex. Ethereum)
    "keccak-512": (72, 0x01, 64),
    "shake128": (168, 0x1F, 32),     # sortie extensible
    "shake256": (136, 0x1F, 64),
}


# =====================================================================
#  INTERFACE
# =====================================================================
def calculer(construction, algo, data, longueur=None):
    if construction == "md":
        return MD_ALGOS[algo].digest(data)
    debit, suffixe, defaut = KECCAK_ALGOS[algo]
    if algo.startswith("shake"):
        n = longueur or defaut
    else:
        n = defaut
    return eponge(data, debit, suffixe, n)


def lire_entree(args):
    if args.file:
        with open(args.file, "rb") as f:
            return f.read()
    if args.hex is not None:
        return bytes.fromhex(args.hex)
    if args.text is not None:
        return args.text.encode("utf-8")
    return input("Texte à hacher : ").encode("utf-8")


def choisir(invite, options):
    for i, o in enumerate(options, 1):
        print(f"  {i}) {o}")
    while True:
        r = input(invite).strip().lower()
        if r.isdigit() and 1 <= int(r) <= len(options):
            return options[int(r) - 1]
        if r in options:
            return r
        print("Choix invalide.")


def mode_interactif():
    print("Construction :")
    c = choisir("Votre choix : ", ["md", "keccak"])
    algos = list(MD_ALGOS) if c == "md" else list(KECCAK_ALGOS)
    print("Fonction de hachage :")
    a = choisir("Votre choix : ", algos)
    longueur = None
    if a.startswith("shake"):
        longueur = int(input("Longueur de sortie en octets : ") or "32")
    print("Type d'entrée :")
    t = choisir("Votre choix : ", ["texte", "fichier"])
    if t == "texte":
        data = input("Texte à hacher : ").encode("utf-8")
    else:
        with open(input("Chemin du fichier : ").strip(), "rb") as f:
            data = f.read()
    return c, a, data, longueur


def test():
    import hashlib
    import os
    entrees = [b"", b"abc", b"a" * 55, b"a" * 56, b"a" * 64, b"a" * 111, b"a" * 112,
               b"a" * 136, b"Bonjour le monde", os.urandom(1000)]
    ok = True
    for algo in MD_ALGOS:
        for e in entrees:
            attendu = hashlib.new(algo, e).digest()
            if calculer("md", algo, e) != attendu:
                ok = False
                print(f"ECHEC md/{algo} (len={len(e)})")
    for algo in KECCAK_ALGOS:
        for e in entrees:
            if algo.startswith("keccak"):
                continue
            if algo.startswith("shake"):
                attendu = hashlib.new(algo, e).digest(200)
                obtenu = calculer("keccak", algo, e, 200)
            else:
                attendu = hashlib.new(algo.replace("-", "_"), e).digest()
                obtenu = calculer("keccak", algo, e)
            if obtenu != attendu:
                ok = False
                print(f"ECHEC keccak/{algo} (len={len(e)})")
    k = calculer("keccak", "keccak-256", b"").hex()
    if k != "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470":
        ok = False
        print("ECHEC keccak-256 (vecteur vide)")
    print("Tous les tests réussis." if ok else "Des tests ont échoué.")
    return 0 if ok else 1


def main():
    p = argparse.ArgumentParser(description="Calcul de hash (Merkle-Damgard / Keccak)")
    p.add_argument("-c", "--construction", choices=["md", "keccak"])
    p.add_argument("-a", "--algo")
    p.add_argument("-t", "--text")
    p.add_argument("-f", "--file")
    p.add_argument("--hex", help="entrée donnée en hexadécimal")
    p.add_argument("-l", "--length", type=int, help="longueur de sortie (octets), SHAKE uniquement")
    p.add_argument("--test", action="store_true", help="vérifie les implémentations avec hashlib")
    p.add_argument("--list", action="store_true", help="liste les fonctions disponibles")
    args = p.parse_args()

    if args.test:
        sys.exit(test())
    if args.list:
        print("md     :", ", ".join(MD_ALGOS))
        print("keccak :", ", ".join(KECCAK_ALGOS))
        return

    if args.construction is None:
        c, a, data, longueur = mode_interactif()
    else:
        c, a = args.construction, (args.algo or "").lower()
        table = MD_ALGOS if c == "md" else KECCAK_ALGOS
        if a not in table:
            p.error(f"algo '{a}' inconnu pour '{c}'. Choix : {', '.join(table)}")
        data, longueur = lire_entree(args), args.length

    print(calculer(c, a, data, longueur).hex())


if __name__ == "__main__":
    main()
