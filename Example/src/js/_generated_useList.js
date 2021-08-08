'use strict'
(function () {
  const list = {
    tagName: 'div',
    attributes: { class: 'tag' },
    children: [
      {
        tagName: 'ul',
        attributes: {},
        children: [
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['hoge1'],
            isRoot: false,
          },
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['hoge2'],
            isRoot: false,
          },
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['hoge3'],
            isRoot: false,
          },
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['hoge4'],
            isRoot: false,
          },
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['hoge5'],
            isRoot: false,
          },
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['hoge6'],
            isRoot: false,
          },
        ],
        content: [],
        isRoot: false,
      },
      {
        tagName: 'ul',
        attributes: {},
        children: [
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['fuga1'],
            isRoot: false,
          },
          {
            tagName: 'li',
            attributes: {},
            children: [],
            content: ['fuga2'],
            isRoot: false,
          },
        ],
        content: [],
        isRoot: false,
      },
      {
        tagName: 'p',
        attributes: {},
        children: [],
        content: ['text'],
        isRoot: false,
      },
      {
        tagName: 'div',
        attributes: {},
        children: [
          {
            tagName: 'a',
            attributes: { href: '/' },
            children: [],
            content: ['a'],
            isRoot: false,
          },
        ],
        content: ['a'],
        isRoot: false,
      },
    ],
    content: ['DUMMY TEXT'],
    isRoot: true,
  }

})()
