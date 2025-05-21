import { ColorState, IconState } from "@/components/zote"

type ZotePromptPreviewProps = {
    colors: ColorState
    icons: IconState
    host: string
    gitRepo: boolean
    merging: boolean
    untracked: boolean
    modified: boolean
    staged: boolean
    ahead: string
    behind: string
}

export const ZotePromptPreview: React.FC<ZotePromptPreviewProps> = ({
    colors,
    icons,
    host,
    gitRepo,
    merging,
    untracked,
    modified,
    staged,
    ahead,
    behind
}) => {
    const {
        AT_COLOR,
        BRACKET_COLOR,
        NAME_COLOR,
        MACHINE_COLOR,
        REMOTE_COLOR,
        TIME_COLOR,
        PATH_COLOR,
        DATE_COLOR,
        RVM_COLOR,
        GIT_ICON_COLOR,
        AHEAD_COLOR,
        BEHIND_COLOR,
        MERGING_COLOR,
        UNTRACKED_COLOR,
        MODIFIED_COLOR,
        STAGED_COLOR,
        GIT_LOCATION_COLOR,
    } = colors

    const {
        AHEAD_ICON,
        BEHIND_ICON,
        MERGING_ICON,
        UNTRACKED_ICON,
        MODIFIED_ICON,
        STAGED_ICON,
        REMOTE_ICON,
        GIT_ICON
    } = icons

    return (
        <div className="font-mono text-lg leading-relaxed">
            <div>
                <span style={{ color: BRACKET_COLOR }}>[</span>
                <span style={{ color: BRACKET_COLOR }}>% </span>
                <span style={{ color: NAME_COLOR }}>ocodo</span>
                <span style={{ color: AT_COLOR }}>@</span>
                <span style={{ color: MACHINE_COLOR }}>{host}</span>
                <span style={{ color: REMOTE_COLOR }}>{REMOTE_ICON}</span>
                <span style={{ color: BRACKET_COLOR }}>|</span>
                <span style={{ color: DATE_COLOR }}>Mon</span>
                <span style={{ color: BRACKET_COLOR }}>|</span>
                <span style={{ color: TIME_COLOR }}>09:11AM</span>
                <span style={{ color: BRACKET_COLOR }}>]</span>
                {gitRepo ?
                    (<span>
                        <span style={{ color: BRACKET_COLOR }}>[</span>
                        <span style={{
                            color: GIT_ICON_COLOR,
                            marginRight: '0.25em'
                        }}>{GIT_ICON}</span>
                        {merging ? (
                            <span style={{ color: MERGING_COLOR }}>{MERGING_ICON}</span>
                        ) : ''}
                        {untracked ? (
                            <span style={{ color: UNTRACKED_COLOR }}>{UNTRACKED_ICON}</span>
                        ) : ''}
                        {modified ? (
                            <span style={{ color: MODIFIED_COLOR }}>{MODIFIED_ICON}</span>
                        ) : ''}
                        {staged ? (
                            <span style={{ color: STAGED_COLOR }}>{STAGED_ICON}</span>
                        ) : ''}
                        {ahead != "" ? (
                            <span>
                                <span style={{ color: AHEAD_COLOR }}>{AHEAD_ICON}</span>
                                <span style={{ color: AHEAD_COLOR }}>2</span>
                            </span>
                        ) : ''}
                        {behind != "" ? (
                            <span>
                                <span style={{ color: BEHIND_COLOR }}>{BEHIND_ICON}</span>
                                <span style={{ color: BEHIND_COLOR }}>2</span>
                            </span>
                        ) : ''}
                        <span style={{
                            marginLeft: '0.25em',
                            color: GIT_LOCATION_COLOR
                        }}>main</span>
                        <span style={{ color: BRACKET_COLOR }}>]</span>
                    </span>) : ''
                }
            </div>
            <div>
                <span style={{ color: BRACKET_COLOR }}>[</span>
                <span style={{ color: PATH_COLOR }}>~/workspace/zote</span>
                <span style={{ color: BRACKET_COLOR }}>]</span>
            </div>
        </div>
    )
}
