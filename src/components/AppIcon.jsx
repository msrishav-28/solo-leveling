import React from 'react';
import * as LucideIcons from 'lucide-react';

const AppIcon = ({ name, className, ...props }) => {
    const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;

    return <IconComponent className={className} {...props} />;
};

export default AppIcon;
