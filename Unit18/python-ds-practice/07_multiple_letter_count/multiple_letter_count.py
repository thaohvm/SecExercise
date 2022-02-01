def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    counter = {}
    for p in phrase:
        if p in counter:
            counter[p] += 1
        else:
            counter[p] = 1
    return counter

# def multiple_letter_count(phrase):
#     """Return dict of {ltr: frequency} from phrase.

#         >>> multiple_letter_count('yay')
#         {'y': 2, 'a': 1}

#         >>> multiple_letter_count('Yay')
#         {'Y': 1, 'a': 1, 'y': 1}
#     """

#     counter = {}

#     for ltr in phrase:
#         counter[ltr] = counter.get(ltr, 0) + 1

#     return counter
