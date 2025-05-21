// src/components/ContactItem.tsx
import React from "react";

type ContactItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
};

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  children,
  ...rest
}) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    <span className="text-blue-600">{icon}</span>
    <a {...rest}>{children}</a>
  </div>
);

export default ContactItem;
