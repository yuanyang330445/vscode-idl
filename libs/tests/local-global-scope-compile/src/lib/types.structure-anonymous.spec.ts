import { CancellationToken } from '@idl/cancellation-tokens';
import { GlobalTokens, ICompileOptions } from '@idl/data-types/core';
import { LogManager } from '@idl/logger';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { ILocalTokens } from '@idl/parsing/syntax-tree';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Types from`, () => {
  it(`[auto generated] anonymous structures`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [
      `pro myPro`,
      `  compile_opt idl2`,
      ``,
      `  a = {a: 'string', $`,
      `    b: \`string\`}`,
      ``,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode(
      'not-real',
      code,
      new CancellationToken(),
      { postProcess: true }
    );

    // define expected local variables
    const expectedVars: ILocalTokens = {
      func: {},
      pro: {
        mypro: {
          a: {
            type: 'v',
            name: 'a',
            pos: [3, 2, 1],
            meta: {
              display: 'a',
              isDefined: true,
              usage: [[3, 2, 1]],
              docs: '',
              source: 'user',
              type: [
                {
                  display: 'Structure',
                  name: 'Structure',
                  args: [],
                  meta: {
                    a: {
                      display: 'a',
                      type: [
                        {
                          display: 'String',
                          name: 'String',
                          args: [],
                          meta: {},
                          value: 'string',
                        },
                      ],
                      direction: 'bidirectional',
                      source: 'user',
                      docs: '',
                      code: true,
                      pos: [3, 7, 2],
                    },
                    b: {
                      display: 'b',
                      type: [
                        {
                          display: 'String',
                          name: 'String',
                          args: [],
                          meta: {},
                          value: 'string',
                        },
                      ],
                      direction: 'bidirectional',
                      source: 'user',
                      docs: '',
                      code: true,
                      pos: [4, 4, 2],
                    },
                  },
                },
              ],
            },
          },
        },
      },
      main: {},
    };

    // verify results
    expect(tokenized.local).toEqual(expectedVars);

    // define expected global variables
    const expectedGlobal: GlobalTokens = [
      {
        type: 'p',
        name: 'mypro',
        pos: [0, 4, 5],
        meta: {
          source: 'user',
          args: {},
          docs: '\n```idl\nmyPro\n```\n',
          docsLookup: {},
          display: 'myPro',
          kws: {},
          private: false,
          struct: [],
        },
        file: 'not-real',
      },
    ];

    // verify results
    expect(tokenized.global).toEqual(expectedGlobal);

    // define expected compile options
    const expectedCompile: ICompileOptions = {
      func: {},
      pro: { mypro: ['idl2'] },
      main: [],
    };

    // verify results
    expect(tokenized.compile).toEqual(expectedCompile);
  });
});
