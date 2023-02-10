import React from 'react';
import classNames from 'classnames';

const RoundIcon = ({
  icon: Icon,
  iconColorClass = 'text-purple-600 dark:text-purple-100',
  bgColorClass = 'bg-purple-100 dark:bg-purple-600',
  className,
  iconStyle,
}) => {
  const baseStyle = 'p-3 rounded-full';
  const iconBaseStyle = 'w-5 h-5';

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return (
    <div className={cls}>
      <Icon className={iconStyle || iconBaseStyle} />
    </div>
  );
};

export default RoundIcon;
