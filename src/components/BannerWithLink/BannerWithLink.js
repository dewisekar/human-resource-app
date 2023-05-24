import React from 'react';

import * as Icons from '../../icons';

function BannerWithLink({
  message = 'wakakak', subtitle = null, link = '#', color = 'purple', icon = 'BellIcon',
}) {
  const SelectedIcon = Icons[icon];
  return (
    <a
      className={`flex items-center justify-between p-4 mb-8 text-sm font-semibold text-${color}-100 bg-${color}-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-${color}`}
      href={link}
    >
      <div className="flex items-center">
        <SelectedIcon className='w-5 h-5 mr-2'/>
        <span>{message}</span>
      </div>
      {subtitle && <span>
        {subtitle} <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }}></span>
      </span>}
    </a>
  );
}

export default BannerWithLink;
