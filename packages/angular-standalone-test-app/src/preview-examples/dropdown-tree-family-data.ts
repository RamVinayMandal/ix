/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TreeModel } from '@siemens/ix';

export let familyTreeData: TreeModel<{
  id: string;
  name: string;
  isStep: boolean;
}> = {
  root: {
    id: 'root',
    hasChildren: true,
    children: ['okyf5mep', 'gmabznu', 'jc0ohr4t', 'wil78kp3', 'zxc45bnm', 'qwe98rty'],
    data: {
      id: 'root',
      name: 'Family Tree',
      isStep: false,
    },
  },
  okyf5mep: {
    id: 'okyf5mep',
    hasChildren: true,
    children: ['3ybyiwzs', '5qmq751j', 'qaz12wsx'],
    data: {
      id: 'okyf5mep',
      name: 'Family Smith',
      isStep: false,
    },
  },
  gmabznu: {
    id: 'gmabznu',
    hasChildren: true,
    children: ['mg2js45o', 'crgz1mw', 'plm34okn'],
    data: {
      id: 'gmabznu',
      name: 'Family Johnson',
      isStep: false,
    },
  },
  jc0ohr4t: {
    id: 'jc0ohr4t',
    hasChildren: true,
    children: ['asmtqo0', 'vbn67mjk'],
    data: {
      id: 'jc0ohr4t',
      name: 'Family Garcia',
      isStep: false,
    },
  },
  '3ybyiwzs': {
    id: '3ybyiwzs',
    hasChildren: true,
    children: ['kkkizm09', 'kkkizm19', 'tyu45iop'],
    data: {
      id: '3ybyiwzs',
      isStep: false,
      name: 'Berlin',
    },
  },
  kkkizm09: {
    id: 'kkkizm09',
    hasChildren: false,
    children: [],
    data: {
      id: 'kkkizm09',
      isStep: true,
      name: 'Cooper',
    },
  },
  kkkizm19: {
    id: 'kkkizm19',
    hasChildren: false,
    children: [],
    data: {
      id: 'kkkizm19',
      isStep: true,
      name: 'Molly',
    },
  },
  '5qmq751j': {
    id: '5qmq751j',
    hasChildren: true,
    children: ['jsab23px', 'ghj56klm'],
    data: {
      id: '5qmq751j',
      isStep: false,
      name: 'NYC',
    },
  },
  jsab23px: {
    id: 'jsab23px',
    hasChildren: false,
    children: [],
    data: {
      id: 'jsab23px',
      isStep: true,
      name: 'Lucy',
    },
  },
  mg2js45o: {
    id: 'mg2js45o',
    hasChildren: true,
    children: ['uvmye537', 'fgh78jkl'],
    data: {
      id: 'mg2js45o',
      isStep: false,
      name: 'Washington D.C',
    },
  },
  crgz1mw: {
    id: 'crgz1mw',
    hasChildren: true,
    children: ['937ol5p', 'rty89uio'],
    data: {
      id: 'crgz1mw',
      isStep: false,
      name: 'L.A.',
    },
  },
  uvmye537: {
    id: 'uvmye537',
    hasChildren: false,
    children: [],
    data: {
      id: 'uvmye537',
      isStep: true,
      name: 'Thomas',
    },
  },
  '937ol5p': {
    id: '937ol5p',
    hasChildren: false,
    children: [],
    data: {
      id: '937ol5p',
      isStep: true,
      name: 'Emily',
    },
  },
  asmtqo0: {
    id: 'asmtqo0',
    hasChildren: true,
    children: ['lu06p2h', 'n4b4lh9', 'zh0ze4wm', 'wsuekjx'],
    data: {
      id: 'asmtqo0',
      isStep: false,
      name: 'London',
    },
  },
  lu06p2h: {
    id: 'lu06p2h',
    hasChildren: false,
    children: [],
    data: {
      id: 'lu06p2h',
      isStep: true,
      name: 'Maria',
    },
  },
  n4b4lh9: {
    id: 'n4b4lh9',
    hasChildren: false,
    children: [],
    data: {
      id: 'n4b4lh9',
      isStep: true,
      name: 'Antonio',
    },
  },
  zh0ze4wm: {
    id: 'zh0ze4wm',
    hasChildren: false,
    children: [],
    data: {
      id: 'zh0ze4wm',
      isStep: true,
      name: 'Sofia',
    },
  },
  wsuekjx: {
    id: 'wsuekjx',
    hasChildren: false,
    children: [],
    data: {
      id: 'wsuekjx',
      isStep: true,
      name: 'Luis',
    },
  },
  // New families
  wil78kp3: {
    id: 'wil78kp3',
    hasChildren: true,
    children: ['poi98lkj', 'mnb65vcx'],
    data: {
      id: 'wil78kp3',
      name: 'Family Williams',
      isStep: false,
    },
  },
  zxc45bnm: {
    id: 'zxc45bnm',
    hasChildren: true,
    children: ['asd34fgh', 'jkl21poi'],
    data: {
      id: 'zxc45bnm',
      name: 'Family Brown',
      isStep: false,
    },
  },
  qwe98rty: {
    id: 'qwe98rty',
    hasChildren: true,
    children: ['uio76plk', 'yhn54mjk'],
    data: {
      id: 'qwe98rty',
      name: 'Family Davis',
      isStep: false,
    },
  },
  // Continuing with all the other nodes...
  qaz12wsx: {
    id: 'qaz12wsx',
    hasChildren: true,
    children: ['edc34rfv', 'tgb56yhn'],
    data: {
      id: 'qaz12wsx',
      isStep: false,
      name: 'Chicago',
    },
  },
  edc34rfv: {
    id: 'edc34rfv',
    hasChildren: false,
    children: [],
    data: {
      id: 'edc34rfv',
      isStep: true,
      name: 'Robert',
    },
  },
  tgb56yhn: {
    id: 'tgb56yhn',
    hasChildren: false,
    children: [],
    data: {
      id: 'tgb56yhn',
      isStep: true,
      name: 'Sarah',
    },
  },
  plm34okn: {
    id: 'plm34okn',
    hasChildren: true,
    children: ['iuj78klp', 'ygv76tfc'],
    data: {
      id: 'plm34okn',
      isStep: false,
      name: 'Miami',
    },
  },
  iuj78klp: {
    id: 'iuj78klp',
    hasChildren: false,
    children: [],
    data: {
      id: 'iuj78klp',
      isStep: true,
      name: 'Michael',
    },
  },
  ygv76tfc: {
    id: 'ygv76tfc',
    hasChildren: false,
    children: [],
    data: {
      id: 'ygv76tfc',
      isStep: true,
      name: 'Jennifer',
    },
  },
  vbn67mjk: {
    id: 'vbn67mjk',
    hasChildren: true,
    children: ['rfv43edc', 'tgb54rfv'],
    data: {
      id: 'vbn67mjk',
      isStep: false,
      name: 'Madrid',
    },
  },
  rfv43edc: {
    id: 'rfv43edc',
    hasChildren: false,
    children: [],
    data: {
      id: 'rfv43edc',
      isStep: true,
      name: 'Carlos',
    },
  },
  tgb54rfv: {
    id: 'tgb54rfv',
    hasChildren: false,
    children: [],
    data: {
      id: 'tgb54rfv',
      isStep: true,
      name: 'Isabella',
    },
  },
  tyu45iop: {
    id: 'tyu45iop',
    hasChildren: false,
    children: [],
    data: {
      id: 'tyu45iop',
      isStep: true,
      name: 'James',
    },
  },
  ghj56klm: {
    id: 'ghj56klm',
    hasChildren: false,
    children: [],
    data: {
      id: 'ghj56klm',
      isStep: true,
      name: 'Emma',
    },
  },
  fgh78jkl: {
    id: 'fgh78jkl',
    hasChildren: false,
    children: [],
    data: {
      id: 'fgh78jkl',
      isStep: true,
      name: 'William',
    },
  },
  rty89uio: {
    id: 'rty89uio',
    hasChildren: false,
    children: [],
    data: {
      id: 'rty89uio',
      isStep: true,
      name: 'Olivia',
    },
  },
  poi98lkj: {
    id: 'poi98lkj',
    hasChildren: true,
    children: ['zxc12vbn', 'qwe34rty'],
    data: {
      id: 'poi98lkj',
      isStep: false,
      name: 'Boston',
    },
  },
  zxc12vbn: {
    id: 'zxc12vbn',
    hasChildren: false,
    children: [],
    data: {
      id: 'zxc12vbn',
      isStep: true,
      name: 'Benjamin',
    },
  },
  qwe34rty: {
    id: 'qwe34rty',
    hasChildren: false,
    children: [],
    data: {
      id: 'qwe34rty',
      isStep: true,
      name: 'Charlotte',
    },
  },
  mnb65vcx: {
    id: 'mnb65vcx',
    hasChildren: true,
    children: ['asd78fgh', 'jkl90poi'],
    data: {
      id: 'mnb65vcx',
      isStep: false,
      name: 'Seattle',
    },
  },
  asd78fgh: {
    id: 'asd78fgh',
    hasChildren: false,
    children: [],
    data: {
      id: 'asd78fgh',
      isStep: true,
      name: 'Henry',
    },
  },
  jkl90poi: {
    id: 'jkl90poi',
    hasChildren: false,
    children: [],
    data: {
      id: 'jkl90poi',
      isStep: true,
      name: 'Amelia',
    },
  },
  asd34fgh: {
    id: 'asd34fgh',
    hasChildren: true,
    children: ['zxc56vbn', 'qwe78rty'],
    data: {
      id: 'asd34fgh',
      isStep: false,
      name: 'Paris',
    },
  },
  zxc56vbn: {
    id: 'zxc56vbn',
    hasChildren: false,
    children: [],
    data: {
      id: 'zxc56vbn',
      isStep: true,
      name: 'Lucas',
    },
  },
  qwe78rty: {
    id: 'qwe78rty',
    hasChildren: false,
    children: [],
    data: {
      id: 'qwe78rty',
      isStep: true,
      name: 'Sophia',
    },
  },
  jkl21poi: {
    id: 'jkl21poi',
    hasChildren: true,
    children: ['mnb43vcx', 'asd65fgh'],
    data: {
      id: 'jkl21poi',
      isStep: false,
      name: 'Rome',
    },
  },
  mnb43vcx: {
    id: 'mnb43vcx',
    hasChildren: false,
    children: [],
    data: {
      id: 'mnb43vcx',
      isStep: true,
      name: 'Alexander',
    },
  },
  asd65fgh: {
    id: 'asd65fgh',
    hasChildren: false,
    children: [],
    data: {
      id: 'asd65fgh',
      isStep: true,
      name: 'Mia',
    },
  },
  uio76plk: {
    id: 'uio76plk',
    hasChildren: true,
    children: ['jkl87poi', 'mnb98vcx'],
    data: {
      id: 'uio76plk',
      isStep: false,
      name: 'Tokyo',
    },
  },
  jkl87poi: {
    id: 'jkl87poi',
    hasChildren: false,
    children: [],
    data: {
      id: 'jkl87poi',
      isStep: true,
      name: 'Ethan',
    },
  },
  mnb98vcx: {
    id: 'mnb98vcx',
    hasChildren: false,
    children: [],
    data: {
      id: 'mnb98vcx',
      isStep: true,
      name: 'Ava',
    },
  },
  yhn54mjk: {
    id: 'yhn54mjk',
    hasChildren: true,
    children: ['uio65plk', 'iop76asd'],
    data: {
      id: 'yhn54mjk',
      isStep: false,
      name: 'Sydney',
    },
  },
  uio65plk: {
    id: 'uio65plk',
    hasChildren: false,
    children: [],
    data: {
      id: 'uio65plk',
      isStep: true,
      name: 'Daniel',
    },
  },
  iop76asd: {
    id: 'iop76asd',
    hasChildren: false,
    children: [],
    data: {
      id: 'iop76asd',
      isStep: true,
      name: 'Isabella',
    },
  },
};
