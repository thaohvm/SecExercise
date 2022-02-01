def fre_counter(phrase):
    counter = {}
    for char in phrase:
        counter[char] = counter.get(char, 0) + 1
    return counter

def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """
    return fre_counter(str(num1)) == fre_counter(str(num2))
