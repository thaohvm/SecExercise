"""Python serial number generator."""

from _typeshed import StrPath


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start = 0):
        """
        Make new representation, starting at start
        """
        self.start = self.next = start
    def __repr__(self):
        return f"<SerialGenerator start={self.start} next={self.next}>"
    def reset(self):
        """ Reset value"""
        self.start = self.start
    def generate(self):
        """ Return next value"""
        self.next += 1
        return self.next - 1
