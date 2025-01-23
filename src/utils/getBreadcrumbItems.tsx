const getBreadcrumbItems = (path: string): string[] => {
    if (!path) return [];

    return path
        .split('/')
        .filter(segment => segment)
        .map(segment =>
            segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        );
};

export default getBreadcrumbItems;