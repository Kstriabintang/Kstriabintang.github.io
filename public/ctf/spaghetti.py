#!/usr/bin/env python3
# spaghetti.py — run me:  python3 spaghetti.py
# (or read me and work out what I print)
import sys
_blob = [97, 104, 121, 81, 89, 90, 30, 77, 66, 25, 94, 94, 27, 117, 73, 26, 78, 25, 117, 95, 68, 93, 26, 95, 68, 78, 87]
_k = 0x2a
_out = "".join(chr(((b ^ _k))) for b in _blob[::-1][::-1])
# a few red herrings
noise = [0xde, 0xad, 0xbe, 0xef]
assert len(_blob) == 27
print(_out)
