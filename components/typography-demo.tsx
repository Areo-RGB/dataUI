import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Mono } from "@/components/ui/typography"

export function TypographyDemo() {
  return (
    <div className="space-y-8">
      <div>
        <H1>Heading 1</H1>
        <P>This is a paragraph following a heading 1. It demonstrates the font-sans class.</P>
      </div>

      <div>
        <H2>Heading 2</H2>
        <P>This is a paragraph following a heading 2.</P>
      </div>

      <div>
        <H3>Heading 3</H3>
        <P>This is a paragraph following a heading 3.</P>
      </div>

      <div>
        <H4>Heading 4</H4>
        <P>This is a paragraph following a heading 4.</P>
      </div>

      <div>
        <Lead>This is a lead paragraph that stands out.</Lead>
        <P>This is a regular paragraph for comparison.</P>
      </div>

      <div>
        <Large>This is large text.</Large>
        <P>This is regular text.</P>
        <Small>This is small text.</Small>
      </div>

      <div>
        <P>Regular paragraph text.</P>
        <Muted>This is muted text, used for less important information.</Muted>
      </div>

      <div>
        <P className="font-serif">This paragraph uses the serif font.</P>
        <Mono>This text uses the monospace font.</Mono>
      </div>
    </div>
  )
}
