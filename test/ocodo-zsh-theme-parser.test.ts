import { parseOcodoZshTheme } from '@/lib/ocodo-zsh-theme-parser'
import { ZotePreset } from '@/data/zote-presets'

describe('parseOcodoZshTheme', () => {
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
GIT_ICON_COLOR="#FFFFFF"
GIT_LOCATION_COLOR="#FFFFFF"

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
      GIT_LOCATION_COLOR: '#FFFFFF',
    },
    icons: {},
    settings: {},
  }

  it('correctly parses theme name', () => {
    const parsed = parseOcodoZshTheme(themeString)
    expect(parsed.themeName).toBe(expectedParsedResult.themeName)
  })

  it('correctly parses color values', () => {
    const parsed = parseOcodoZshTheme(themeString)
    expect(parsed.colors).toEqual(expectedParsedResult.colors)
  })

  it('correctly parses icon values (should be empty in this case)', () => {
    const parsed = parseOcodoZshTheme(themeString)
    expect(parsed.icons).toEqual(expectedParsedResult.icons)
  })

  it('correctly parses settings values (should be empty in this case)', () => {
    const parsed = parseOcodoZshTheme(themeString)
    expect(parsed.settings).toEqual(expectedParsedResult.settings)
  })

  it('parses colors with correct values for each key', () => {
    const parsed = parseOcodoZshTheme(themeString)
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
    expect(parsed.colors.GIT_LOCATION_COLOR).toBe('#FFFFFF')
  })

  it('ensures there are no icons parsed (as expected)', () => {
    const parsed = parseOcodoZshTheme(themeString)
    expect(parsed.icons).toEqual({})
  })

  it('ensures there are no settings parsed (as expected)', () => {
    const parsed = parseOcodoZshTheme(themeString)
    expect(parsed.settings).toEqual({})
  })

  it('handles an empty theme string (should parse with default values)', () => {
    const emptyThemeString = ''
    const parsed = parseOcodoZshTheme(emptyThemeString)
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
    const parsed = parseOcodoZshTheme(noNameThemeString)
    expect(parsed.themeName).toBe('untitled')
    expect(parsed.colors.AT_COLOR).toBe('#FFFFFF')
    expect(parsed.colors.BRACKET_COLOR).toBe('#c7a23c')
  })
})
