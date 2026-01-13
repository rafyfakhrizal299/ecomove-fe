/**
 * Converts a Date object to a formatted string representation.
 * @param date - The Date object to be formatted.
 * @returns A string representing the formatted date.
 */
export const toFormattedDate = (date: Date, defaultOption?: Intl.DateTimeFormatOptions, locales?: Intl.LocalesArgument): string => {
    try {
        const options: Intl.DateTimeFormatOptions = defaultOption ? defaultOption : {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleDateString(locales || 'en-US', options);
    } catch (error) {
        console.error('Error: ', error);
    }
    return '';
};