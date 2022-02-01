def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    newStr = ""
    words = phrase.split(" ")
    for word in words:
        newStr += word.capitalize() + " "
    return newStr[0:-1]

    # return phrase.title()
