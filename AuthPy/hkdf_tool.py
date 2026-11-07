#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
hkdf_tool.py - Dérivation de clé HKDF (RFC 5869)
  Extract : PRK = HMAC(sel, IKM)
  Expand  : T(i) = HMAC(PRK, T(i-1) || info || i),  OKM = T(1) || T(2) || ... tronqué à L octets
Nécessite hash_tool.py, mac_naif.py et hmac_tool.py dans le même dossier.

  python hkdf_tool.py                                    -> mode interactif
  python hkdf_tool.py -c md -a sha256 --ikm secret --salt sel --info contexte -L 42
  python hkdf_tool.py -c keccak -a sha3-256 --ikm secret --info app -L 64 -v
  python hkdf_tool.py --test
"""
import argparse
import sys

from hash_tool import MD_ALGOS, KECCAK_ALGOS, calculer, choisir
from hmac_tool import hmac


def taille_hash(construction, algo, longueur=None):
    return len(calculer(construction, algo, b"", longueur))


def hkdf_extract(construction, algo, ikm, sel, longueur=None):
    """PRK = HMAC(sel, IKM). Sel vide -> HashLen octets nuls."""
    if not sel:
        sel = b"\x00" * taille_hash(construction, algo, longueur)
    return hmac(construction, algo, sel, ikm, longueur)


def hkdf_expand(construction, algo, prk, info, L, longueur=None, blocs=None):
    n = taille_hash(construction, algo, longueur)
    if L > 255 * n:
        raise ValueError(f"L trop grand : maximum {255 * n} octets pour cette fonction")
    okm, t = b"", b""
    i = 1
    while len(okm) < L:
        t = hmac(construction, algo, prk, t + info + bytes([i]), longueur)
        if blocs is not None:
            blocs.append((i, t))
        okm += t
        i += 1
    return okm[:L]


def hkdf(construction, algo, ikm, sel, info, L, longueur=None):
    prk = hkdf_extract(construction, algo, ikm, sel, longueur)
    return prk, hkdf_expand(construction, algo, prk, info, L, longueur)


def test():
    ok = True
    # RFC 5869, cas de test 1 (SHA-256)
    ikm = bytes([0x0B] * 22)
    sel = bytes(range(0x0C + 1))
    info = bytes(range(0xF0, 0xFA))
    prk, okm = hkdf("md", "sha256", ikm, sel, info, 42)
    if prk.hex() != "077709362c2e32df0ddc3f0dc47bba6390b6c73bb50f9c3122ec844ad7c2b3e5":
        ok = False
        print("ECHEC PRK (RFC 5869 cas 1)")
    if okm.hex() != ("3cb25f25faacd57a90434f64d0362f2a2d2d0a90cf1a5a4c5db02d56ecc4c5bf"
                     "34007208d5b887185865"):
        ok = False
        print("ECHEC OKM (RFC 5869 cas 1)")
    # RFC 5869, cas de test 3 (SHA-256, sel et info vides)
    prk, okm = hkdf("md", "sha256", bytes([0x0B] * 22), b"", b"", 42)
    if okm.hex() != ("8da4e775a563c18f715f802a063c5a31b8a11f5c5ee1879ec3454e5f3c738d2d"
                     "9d201395faa4b61a96c8"):
        ok = False
        print("ECHEC OKM (RFC 5869 cas 3)")
    # RFC 5869, cas de test 4 (SHA-1)
    prk, okm = hkdf("md", "sha1", bytes([0x0B] * 11), bytes(range(0x0C + 1)),
                    bytes(range(0xF0, 0xFA)), 42)
    if okm.hex() != ("085a01ea1b10f36933068b56efa5ad81a4f14b822f5b091568a9cdd4f155fda2"
                     "c22e422478d305f3f896"):
        ok = False
        print("ECHEC OKM (RFC 5869 cas 4)")
    print("Tous les tests réussis." if ok else "Des tests ont échoué.")
    return 0 if ok else 1


def saisie(valeur, valeur_hex):
    if valeur_hex is not None:
        return bytes.fromhex(valeur_hex)
    return (valeur or "").encode("utf-8")


def executer(c, a, ikm, sel, info, L, longueur, verbeux=True):
    prk = hkdf_extract(c, a, ikm, sel, longueur)
    print("PRK :", prk.hex())
    blocs = []
    okm = hkdf_expand(c, a, prk, info, L, longueur, blocs)
    if verbeux:
        for i, t in blocs:
            print(f"T({i}) :", t.hex())
    print(f"OKM ({L} octets) :", okm.hex())


def mode_interactif():
    print("Construction :")
    c = choisir("Votre choix : ", ["md", "keccak"])
    algos = list(MD_ALGOS) if c == "md" else list(KECCAK_ALGOS)
    print("Fonction de hachage :")
    a = choisir("Votre choix : ", algos)
    longueur = None
    if a.startswith("shake"):
        longueur = int(input("Longueur de sortie du hash en octets : ") or "32")
    ikm = input("IKM (clé secrète) : ").encode("utf-8")
    sel = input("Sel (vide = aucun) : ").encode("utf-8")
    prk = hkdf_extract(c, a, ikm, sel, longueur)
    print("PRK :", prk.hex())
    info = input("Info (contexte) : ").encode("utf-8")
    L = int(input("Longueur souhaitée de l'OKM en octets : "))
    blocs = []
    okm = hkdf_expand(c, a, prk, info, L, longueur, blocs)
    for i, t in blocs:
        print(f"T({i}) :", t.hex())
    print(f"OKM ({L} octets) :", okm.hex())


def main():
    p = argparse.ArgumentParser(description="HKDF (Merkle-Damgard / Keccak)")
    p.add_argument("-c", "--construction", choices=["md", "keccak"])
    p.add_argument("-a", "--algo")
    p.add_argument("--ikm", help="matériau de clé initial (texte)")
    p.add_argument("--ikm-hex")
    p.add_argument("--salt", help="sel (texte), vide par défaut")
    p.add_argument("--salt-hex")
    p.add_argument("--info", help="info / contexte (texte), vide par défaut")
    p.add_argument("--info-hex")
    p.add_argument("-L", "--length", type=int, help="longueur de l'OKM en octets")
    p.add_argument("-l", "--hash-length", type=int, help="longueur de sortie du hash (SHAKE)")
    p.add_argument("-v", "--verbose", action="store_true", help="affiche les blocs T(i)")
    p.add_argument("--test", action="store_true")
    args = p.parse_args()

    if args.test:
        sys.exit(test())
    if args.construction is None:
        mode_interactif()
        return

    c, a = args.construction, (args.algo or "").lower()
    table = MD_ALGOS if c == "md" else KECCAK_ALGOS
    if a not in table:
        p.error(f"algo '{a}' inconnu pour '{c}'. Choix : {', '.join(table)}")
    if args.length is None:
        p.error("-L (longueur de l'OKM) est obligatoire")
    ikm = saisie(args.ikm, args.ikm_hex)
    sel = saisie(args.salt, args.salt_hex)
    info = saisie(args.info, args.info_hex)
    try:
        executer(c, a, ikm, sel, info, args.length, args.hash_length, args.verbose)
    except ValueError as e:
        p.error(str(e))


if __name__ == "__main__":
    main()
