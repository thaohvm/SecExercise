# For a list of words, print out each word on a separate line,
# but in all uppercase.
# How can you change a word to uppercase?
# Ask Python for help on what you can do with strings!

# Turn that into a function, print_upper_words.
# Test it out. (Don’t forget to add a docstring to your function!)

def print_upper_words(words):
    """Print each word on sep line, uppercased.

        >>> print_upper_words(["Programming", "is", "pretty", "fun"])
        PROGRAMMING
        IS
        PRETTY
        FUN
    """
    for word in words:
        print(word.upper())

print_upper_words(["Programming", "is", "pretty", "fun"])

# Change that function so that it only prints words that
# start with the letter ‘e’ (either upper or lowercase).

def print_upper_words2(words):
    """Print each word on sep line, uppercased, if starts with E or e.

        >>> print_upper_words2(["eagle", "Edward", "Alfred"])
        EAGLE
        EDWARD
    """

    for word in words:
        if word[0] == "e" or word[0]=="E":
            print(word.upper())

print_upper_words2(["eagle", "Edward", "Alfred"])

# Make your function more general: you should be able to
# pass in a set of letters, and it only prints words that start with one of those letters.

def print_upper_words3(words, letters):
    """Print each word on sep line, uppercased, if starts with one of given

        >>> print_upper_words3(["eagle", "Edward", "Alfred", "zope"],
        ...                   letters=["A", "E"])
        EDWARD
        ALFRED
    """

    for word in words:
        for letter in letters:
            if word.startwith(letter):
                print(word.upperr())


print_upper_words3(["eagle", "Edward", "Alfred", "zope"])
