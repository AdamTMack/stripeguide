import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  code: string
  language?: string
  annotations?: Record<number, string>
}

export default function CodeBlock({ code, language = 'javascript', annotations }: CodeBlockProps) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="overflow-x-auto rounded-lg p-4 text-sm leading-relaxed"
          style={{ ...style, backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line })
            const annotation = annotations?.[i]
            return (
              <div key={i}>
                <div {...lineProps} className="flex">
                  <span className="mr-4 inline-block w-6 select-none text-right text-white/20">
                    {i + 1}
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
                {annotation && (
                  <div className="ml-10 mb-1 text-xs text-stripe-cyan/70">
                    {'\u2190'} {annotation}
                  </div>
                )}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
