import { parseZoteTheme } from '@/lib/zote-parser'
import { ZotePreset } from '@/data/zote-presets'

describe('parseOcodoZshTheme', () => {
  const heliosTheme = `
# Theme name: Helios

AT_COLOR="#AA9966"
BRACKET_COLOR="#c7a23c"
NAME_COLOR="#fff2d6"
MACHINE_COLOR="#ffaf00"
TIME_COLOR="#fff2d6"
DATE_COLOR="#ff9900"
PATH_COLOR="#ffdf87"
RVM_COLOR="#ffaf00"
AHEAD_COLOR="#AA3333"
AHEAD_ICON="🢁"
BEHIND_COLOR="#00FFFF"
BEHIND_ICON="🢃"
MERGING_COLOR="#CC33CC"
MERGING_ICON=" "
UNTRACKED_COLOR="#AA3333"
UNTRACKED_ICON="●"
MODIFIED_COLOR="#FFFFAA"
MODIFIED_ICON="●"
STAGED_COLOR="#559955"
STAGED_ICON="●"
GIT_ICON=" "
GIT_ICON_COLOR="#FFAF00"
GIT_LOCATION_COLOR="#aa760e"
REMOTE_COLOR="#FFBB55"
REMOTE_ICON=" 󱫋 "
DIVIDER="|"

ZSH_PROMPT_WEEK_DAY=""

# ZSH_PROMPT_WEEK_DAY="%(0w,อา.,)%(1w,จ.,)%(2w,อ.,)%(3w,พ.,)%(4w,พฤ.,)%(5w,ศ.,)%(6w,ส.,)"
# ZSH_PROMPT_WEEK_DAY="%(0w,Sun,)%(1w,Mon,)%(2w,Tue,)%(3w,Wed,)%(4w,Thu,)%(5w,Fri,)%(6w,Sat,)"

source ~/.zsh.d/lib/theme-engine-truecolor.zsh
`

  const themeString = `
# Theme name: Default

AT_COLOR="#FFFFFF"
BRACKET_COLOR="#c7a23c"
NAME_COLOR="#fff2d6"
MACHINE_COLOR="#ffaf00"
TIME_COLOR="#ffffff"
DATE_COLOR="#ffffff"
PATH_COLOR="#ffdf87"
RVM_COLOR="#ffaf00"
AHEAD_COLOR="#AA3333"
BEHIND_COLOR="#00FFFF"
MERGING_COLOR="#CC33CC"
UNTRACKED_COLOR="#AA3333"
MODIFIED_COLOR="#FFFFAA"
STAGED_COLOR="#559955"
REMOTE_COLOR="#83cbff"
GIT_ICON_COLOR='#FFFFFF'
GIT_LOCATION_COLOR=FFFFFF

source ~/.zsh.d/lib/theme-engine-truecolor.zsh
`

  const expectedParsedResult: ZotePreset = {
    themeName: 'Default',
    colors: {
      AT_COLOR: '#FFFFFF',
      BRACKET_COLOR: '#c7a23c',
      NAME_COLOR: '#fff2d6',
      MACHINE_COLOR: '#ffaf00',
      TIME_COLOR: '#ffffff',
      DATE_COLOR: '#ffffff',
      PATH_COLOR: '#ffdf87',
      RVM_COLOR: '#ffaf00',
      AHEAD_COLOR: '#AA3333',
      BEHIND_COLOR: '#00FFFF',
      MERGING_COLOR: '#CC33CC',
      UNTRACKED_COLOR: '#AA3333',
      MODIFIED_COLOR: '#FFFFAA',
      STAGED_COLOR: '#559955',
      REMOTE_COLOR: '#83cbff',
      GIT_ICON_COLOR: '#FFFFFF',
      GIT_LOCATION_COLOR: 'FFFFFF',
    },
    icons: {},
    settings: {},
  }

  it('correctly parses theme name', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.themeName).toBe(expectedParsedResult.themeName)
  })

  it('correctly parses color values', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.colors).toEqual(expectedParsedResult.colors)
  })

  it('correctly parses icon values (should be empty in this case)', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.icons).toEqual(expectedParsedResult.icons)
  })

  it('correctly parses settings values (should be empty in this case)', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.settings).toEqual(expectedParsedResult.settings)
  })

  it('parses settings with correct values for each key', () => {
    const parsed = parseZoteTheme(heliosTheme)
    expect(parsed.settings.ZSH_PROMPT_WEEK_DAY).toBe('')
    expect(parsed.settings.DIVIDER).toBe('|')
  })

  it(`parses icons with correct values for corresponding key`, () => {
    const parsed = parseZoteTheme(heliosTheme)
    expect(parsed.icons.AHEAD_ICON).toBe('🢁')
    expect(parsed.icons.BEHIND_ICON).toBe('🢃')
    expect(parsed.icons.MERGING_ICON).toBe(" ")
    expect(parsed.icons.UNTRACKED_ICON).toBe("●")
    expect(parsed.icons.MODIFIED_ICON).toBe("●")
    expect(parsed.icons.STAGED_ICON).toBe("●")
    expect(parsed.icons.GIT_ICON).toBe(" ")
    expect(parsed.icons.REMOTE_ICON).toBe(" 󱫋 ")
  })

  it('parses colors with correct values for corresponding key', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.colors.AT_COLOR).toBe('#FFFFFF')
    expect(parsed.colors.BRACKET_COLOR).toBe('#c7a23c')
    expect(parsed.colors.NAME_COLOR).toBe('#fff2d6')
    expect(parsed.colors.MACHINE_COLOR).toBe('#ffaf00')
    expect(parsed.colors.TIME_COLOR).toBe('#ffffff')
    expect(parsed.colors.DATE_COLOR).toBe('#ffffff')
    expect(parsed.colors.PATH_COLOR).toBe('#ffdf87')
    expect(parsed.colors.RVM_COLOR).toBe('#ffaf00')
    expect(parsed.colors.AHEAD_COLOR).toBe('#AA3333')
    expect(parsed.colors.BEHIND_COLOR).toBe('#00FFFF')
    expect(parsed.colors.MERGING_COLOR).toBe('#CC33CC')
    expect(parsed.colors.UNTRACKED_COLOR).toBe('#AA3333')
    expect(parsed.colors.MODIFIED_COLOR).toBe('#FFFFAA')
    expect(parsed.colors.STAGED_COLOR).toBe('#559955')
    expect(parsed.colors.REMOTE_COLOR).toBe('#83cbff')
    expect(parsed.colors.GIT_ICON_COLOR).toBe('#FFFFFF')
    expect(parsed.colors.GIT_LOCATION_COLOR).toBe('FFFFFF')
  })

  it('ensures there are no icons parsed (as expected)', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.icons).toEqual({})
  })

  it('ensures there are no settings parsed (as expected)', () => {
    const parsed = parseZoteTheme(themeString)
    expect(parsed.settings).toEqual({})
  })

  it('handles an empty theme string (should parse with default values)', () => {
    const emptyThemeString = ''
    const parsed = parseZoteTheme(emptyThemeString)
    expect(parsed.themeName).toBe('untitled')
    expect(parsed.colors).toEqual({})
    expect(parsed.icons).toEqual({})
    expect(parsed.settings).toEqual({})
  })

  it('parses correctly when there is no theme name defined', () => {
    const noNameThemeString = `
      AT_COLOR="#FFFFFF"
      BRACKET_COLOR="#c7a23c"
    `
    const parsed = parseZoteTheme(noNameThemeString)
    expect(parsed.themeName).toBe('untitled')
    expect(parsed.colors.AT_COLOR).toBe('#FFFFFF')
    expect(parsed.colors.BRACKET_COLOR).toBe('#c7a23c')
  })
})
