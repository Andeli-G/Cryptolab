#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
hmac_tool.py - HMAC(K, M) = H((K' xor opad) || H((K' xor ipad) || M))
Nécessite hash_tool.py (et mac_naif.py pour --compare) dans le même dossier.

  python hmac_tool.py                                   -> mode interactif
  python hmac_tool.py -c md -a sha256 -k secret -t "message"
  python hmac_tool.py -c keccak -a sha3-256 -k secret -f fichier.bin
  python hmac_tool.py -c md -a sha256 -k secret -t "message" --compare
  python hmac_tool.py -c md -a sha256 -k secret -t "message" --verify <hmac_hex>
  python hmac_tool.py --test
"""
import argparse
import sys

from hash_tool import MD_ALGOS, KECCAK_ALGOS, calculer, choisir
from mac_naif import mac_naif, egal_temps_constant, lire_message


def taille_bloc(construction, algo):
    """Taille de bloc B : bloc de compression (MD) ou débit r (Keccak)."""
    if construction == "md":
        return MD_ALGOS[algo].B
    return KECCAK_ALGOS[algo][0]


def hmac(construction, algo, cle, message, longueur=None):
    B = taille_bloc(construction, algo)
    if len(cle) > B:
        cle = calculer(construction, algo, cle, longueur)
    cle = cle.ljust(B, b"\x00")
    k_ipad = bytes(b ^ 0x36 for b in cle)
    k_opad = bytes(b ^ 0x5C for b in cle)
    interne = calculer(construction, algo, k_ipad + message, longueur)
    return calculer(construction, algo, k_opad + interne, longueur)


def test():
    import hashlib
    import hmac as hm
    ok = True
    cles = [b"k", b"cle secrete", b"x" * 64, b"y" * 200]
    msgs = [b"", b"Bonjour le monde", b"m" * 300]
    for cle in cles:
        for msg in msgs:
            for algo in MD_ALGOS:
                if hmac("md", algo, cle, msg) != hm.new(cle, msg, algo).digest():
                    ok = False
                    print("ECHEC md/" + algo)
            for algo in KECCAK_ALGOS:
                if algo.startswith(("keccak", "shake")):
                    continue
                att = hm.new(cle, msg, algo.replace("-", "_")).digest()
                if hmac("keccak", algo, cle, msg) != att:
                    ok = False
                    print("ECHEC keccak/" + algo)
    # vecteur RFC 4231 (cas 2) : HMAC-SHA256("Jefe", "what do ya want for nothing?")
    v = hmac("md", "sha256", b"Jefe", b"what do ya want for nothing?").hex()
    if v != "5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843":
        ok = False
        print("ECHEC vecteur RFC 4231")
    print("Tous les tests réussis." if ok else "Des tests ont échoué.")
    return 0 if ok else 1


def mode_interactif():
    print("Construction :")
    c = choisir("Votre choix : ", ["md", "keccak"])
    algos = list(MD_ALGOS) if c == "md" else list(KECCAK_ALGOS)
    print("Fonction de hachage :")
    a = choisir("Votre choix : ", algos)
    longueur = None
    if a.startswith("shake"):
        longueur = int(input("Longueur de sortie en octets : ") or "32")
    cle = input("Clé secrète : ").encode("utf-8")
    print("Type de message :")
    t = choisir("Votre choix : ", ["texte", "fichier"])
    if t == "texte":
        msg = input("Message : ").encode("utf-8")
    else:
        with open(input("Chemin du fichier : ").strip(), "rb") as f:
            msg = f.read()
    return c, a, cle, msg, longueur


def afficher(c, a, cle, msg, longueur):
    print("HMAC          :", hmac(c, a, cle, msg, longueur).hex())
    print("MAC naïf      :", mac_naif(c, a, cle, msg, longueur).hex())


def main():
    p = argparse.ArgumentParser(description="HMAC (Merkle-Damgard / Keccak)")
    p.add_argument("-c", "--construction", choices=["md", "keccak"])
    p.add_argument("-a", "--algo")
    p.add_argument("-k", "--key", help="clé secrète (texte)")
    p.add_argument("--key-hex", help="clé secrète en hexadécimal")
    p.add_argument("-t", "--text")
    p.add_argument("-f", "--file")
    p.add_argument("--hex", help="message en hexadécimal")
    p.add_argument("-l", "--length", type=int, help="longueur de sortie (octets), SHAKE")
    p.add_argument("--compare", action="store_true", help="affiche aussi le MAC naïf H(K||M)")
    p.add_argument("--verify", metavar="HMAC_HEX", help="vérifie un HMAC fourni")
    p.add_argument("--test", action="store_true")
    args = p.parse_args()

    if args.test:
        sys.exit(test())

    if args.construction is None:
        c, a, cle, msg, longueur = mode_interactif()
        afficher(c, a, cle, msg, longueur)
        return

    c, a = args.construction, (args.algo or "").lower()
    table = MD_ALGOS if c == "md" else KECCAK_ALGOS
    if a not in table:
        p.error(f"algo '{a}' inconnu pour '{c}'. Choix : {', '.join(table)}")
    if args.key_hex is not None:
        cle = bytes.fromhex(args.key_hex)
    elif args.key is not None:
        cle = args.key.encode("utf-8")
    else:
        cle = input("Clé secrète : ").encode("utf-8")
    msg = lire_message(args)

    if args.verify:
        valide = egal_temps_constant(hmac(c, a, cle, msg, args.length), bytes.fromhex(args.verify))
        print("HMAC VALIDE" if valide else "HMAC INVALIDE")
        sys.exit(0 if valide else 1)
    if args.compare:
        afficher(c, a, cle, msg, args.length)
    else:
        print(hmac(c, a, cle, msg, args.length).hex())


if __name__ == "__main__":
    main()
