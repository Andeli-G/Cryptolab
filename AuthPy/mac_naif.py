#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
mac_naif.py - MAC naïf : MAC(K, M) = H(K || M)
Nécessite hash_tool.py dans le même dossier.

  python mac_naif.py                                   -> mode interactif
  python mac_naif.py -c md -a sha256 -k secret -t "message"
  python mac_naif.py -c keccak -a sha3-256 -k secret -f fichier.bin
  python mac_naif.py -c md -a sha256 -k secret -t "message" --verify <mac_hex>
  python mac_naif.py --test
"""
import argparse
import sys

from hash_tool import MD_ALGOS, KECCAK_ALGOS, calculer, choisir


def mac_naif(construction, algo, cle, message, longueur=None):
    return calculer(construction, algo, cle + message, longueur)


def egal_temps_constant(a, b):
    if len(a) != len(b):
        return False
    r = 0
    for x, y in zip(a, b):
        r |= x ^ y
    return r == 0


def test():
    import hashlib
    ok = True
    cle, msg = b"cle secrete", b"Bonjour le monde"
    for algo in MD_ALGOS:
        if mac_naif("md", algo, cle, msg) != hashlib.new(algo, cle + msg).digest():
            ok = False
            print("ECHEC md/" + algo)
    for algo in KECCAK_ALGOS:
        if algo.startswith("keccak"):
            continue
        if algo.startswith("shake"):
            att = hashlib.new(algo, cle + msg).digest(64)
            obt = mac_naif("keccak", algo, cle, msg, 64)
        else:
            att = hashlib.new(algo.replace("-", "_"), cle + msg).digest()
            obt = mac_naif("keccak", algo, cle, msg)
        if att != obt:
            ok = False
            print("ECHEC keccak/" + algo)
    print("Tous les tests réussis." if ok else "Des tests ont échoué.")
    return 0 if ok else 1


def lire_message(args):
    if args.file:
        with open(args.file, "rb") as f:
            return f.read()
    if args.hex is not None:
        return bytes.fromhex(args.hex)
    if args.text is not None:
        return args.text.encode("utf-8")
    return input("Message : ").encode("utf-8")


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


def main():
    p = argparse.ArgumentParser(description="MAC naïf H(K || M)")
    p.add_argument("-c", "--construction", choices=["md", "keccak"])
    p.add_argument("-a", "--algo")
    p.add_argument("-k", "--key", help="clé secrète (texte)")
    p.add_argument("--key-hex", help="clé secrète en hexadécimal")
    p.add_argument("-t", "--text")
    p.add_argument("-f", "--file")
    p.add_argument("--hex", help="message en hexadécimal")
    p.add_argument("-l", "--length", type=int, help="longueur de sortie (octets), SHAKE")
    p.add_argument("--verify", metavar="MAC_HEX", help="vérifie un MAC fourni")
    p.add_argument("--test", action="store_true")
    args = p.parse_args()

    if args.test:
        sys.exit(test())

    if args.construction is None:
        c, a, cle, msg, longueur = mode_interactif()
        verif = None
    else:
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
        msg, longueur, verif = lire_message(args), args.length, args.verify

    mac = mac_naif(c, a, cle, msg, longueur)
    if verif:
        valide = egal_temps_constant(mac, bytes.fromhex(verif))
        print("MAC VALIDE" if valide else "MAC INVALIDE")
        sys.exit(0 if valide else 1)
    print(mac.hex())


if __name__ == "__main__":
    main()
