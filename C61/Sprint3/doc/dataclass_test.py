from dataclasses import dataclass


@dataclass
class Specs1:
    a: str
    b: str = 'Bravo'
    c: str = 'Charlie'
a = 'Apple'
b = None
c = 'Potato'
specs = Specs1(a=a, b=b or Specs1.b, c=c or Specs1.c)
print(specs)