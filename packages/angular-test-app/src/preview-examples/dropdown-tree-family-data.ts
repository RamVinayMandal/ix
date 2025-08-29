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
      name: 'Family Williams',
      isStep: false,
    },
  },
  wil78kp3: {
    id: 'wil78kp3',
    hasChildren: true,
    children: ['tyu89iop', 'hjk56bnm'],
    data: {
      id: 'wil78kp3',
      name: 'Family Brown',
      isStep: false,
    },
  },
  zxc45bnm: {
    id: 'zxc45bnm',
    hasChildren: true,
    children: ['dfg23sdf', 'rty67ert'],
    data: {
      id: 'zxc45bnm',
      name: 'Family Davis',
      isStep: false,
    },
  },
  qwe98rty: {
    id: 'qwe98rty',
    hasChildren: false,
    children: [],
    data: {
      id: 'qwe98rty',
      name: 'Family Miller',
      isStep: false,
    },
  },
  '3ybyiwzs': {
    id: '3ybyiwzs',
    hasChildren: true,
    children: ['xcrjr3ws', 'qjf4hcl2'],
    data: {
      id: '3ybyiwzs',
      name: 'John Smith',
      isStep: false,
    },
  },
  '5qmq751j': {
    id: '5qmq751j',
    hasChildren: true,
    children: ['kb6j7ndc', 'mko98lkj'],
    data: {
      id: '5qmq751j',
      name: 'Mary Smith',
      isStep: false,
    },
  },
  qaz12wsx: {
    id: 'qaz12wsx',
    hasChildren: false,
    children: [],
    data: {
      id: 'qaz12wsx',
      name: 'Robert Smith',
      isStep: false,
    },
  },
  mg2js45o: {
    id: 'mg2js45o',
    hasChildren: true,
    children: ['poi87yui', 'lkj65cvb'],
    data: {
      id: 'mg2js45o',
      name: 'James Johnson',
      isStep: false,
    },
  },
  crgz1mw: {
    id: 'crgz1mw',
    hasChildren: false,
    children: [],
    data: {
      id: 'crgz1mw',
      name: 'Patricia Johnson',
      isStep: false,
    },
  },
  plm34okn: {
    id: 'plm34okn',
    hasChildren: true,
    children: ['mnb76qaz'],
    data: {
      id: 'plm34okn',
      name: 'Michael Johnson',
      isStep: false,
    },
  },
  asmtqo0: {
    id: 'asmtqo0',
    hasChildren: false,
    children: [],
    data: {
      id: 'asmtqo0',
      name: 'Linda Williams',
      isStep: false,
    },
  },
  vbn67mjk: {
    id: 'vbn67mjk',
    hasChildren: true,
    children: ['wsx34edc', 'rfv98tgb'],
    data: {
      id: 'vbn67mjk',
      name: 'William Williams',
      isStep: false,
    },
  },
  tyu89iop: {
    id: 'tyu89iop',
    hasChildren: false,
    children: [],
    data: {
      id: 'tyu89iop',
      name: 'Elizabeth Brown',
      isStep: false,
    },
  },
  hjk56bnm: {
    id: 'hjk56bnm',
    hasChildren: true,
    children: ['yhn76ujm'],
    data: {
      id: 'hjk56bnm',
      name: 'David Brown',
      isStep: false,
    },
  },
  dfg23sdf: {
    id: 'dfg23sdf',
    hasChildren: false,
    children: [],
    data: {
      id: 'dfg23sdf',
      name: 'Barbara Davis',
      isStep: false,
    },
  },
  rty67ert: {
    id: 'rty67ert',
    hasChildren: false,
    children: [],
    data: {
      id: 'rty67ert',
      name: 'Richard Davis',
      isStep: false,
    },
  },
  xcrjr3ws: {
    id: 'xcrjr3ws',
    hasChildren: false,
    children: [],
    data: {
      id: 'xcrjr3ws',
      name: 'Susan Smith Jr.',
      isStep: false,
    },
  },
  qjf4hcl2: {
    id: 'qjf4hcl2',
    hasChildren: false,
    children: [],
    data: {
      id: 'qjf4hcl2',
      name: 'Joseph Smith Jr.',
      isStep: false,
    },
  },
  kb6j7ndc: {
    id: 'kb6j7ndc',
    hasChildren: false,
    children: [],
    data: {
      id: 'kb6j7ndc',
      name: 'Thomas Smith Jr.',
      isStep: false,
    },
  },
  mko98lkj: {
    id: 'mko98lkj',
    hasChildren: false,
    children: [],
    data: {
      id: 'mko98lkj',
      name: 'Christopher Smith Jr.',
      isStep: false,
    },
  },
  poi87yui: {
    id: 'poi87yui',
    hasChildren: false,
    children: [],
    data: {
      id: 'poi87yui',
      name: 'Charles Johnson Jr.',
      isStep: false,
    },
  },
  lkj65cvb: {
    id: 'lkj65cvb',
    hasChildren: false,
    children: [],
    data: {
      id: 'lkj65cvb',
      name: 'Daniel Johnson Jr.',
      isStep: false,
    },
  },
  mnb76qaz: {
    id: 'mnb76qaz',
    hasChildren: false,
    children: [],
    data: {
      id: 'mnb76qaz',
      name: 'Matthew Johnson Jr.',
      isStep: false,
    },
  },
  wsx34edc: {
    id: 'wsx34edc',
    hasChildren: false,
    children: [],
    data: {
      id: 'wsx34edc',
      name: 'Anthony Williams Jr.',
      isStep: false,
    },
  },
  rfv98tgb: {
    id: 'rfv98tgb',
    hasChildren: false,
    children: [],
    data: {
      id: 'rfv98tgb',
      name: 'Mark Williams Jr.',
      isStep: false,
    },
  },
  yhn76ujm: {
    id: 'yhn76ujm',
    hasChildren: false,
    children: [],
    data: {
      id: 'yhn76ujm',
      name: 'Donald Brown Jr.',
      isStep: false,
    },
  },
};
