import './styles.css';

import React from 'react'

export default function ItemList({ url_repo, title, description }) {
  return (
    <div className='item-list'>
        <strong><a href={ url_repo } target='blank'>{ title }</a></strong>
        <p>{ description }</p>
        <hr />
    </div>
  )
}

export {ItemList};
