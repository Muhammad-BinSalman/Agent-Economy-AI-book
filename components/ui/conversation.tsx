"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Orb } from "@/components/ui/orb"

type ConversationContextValue = {
  contentRef: React.RefObject<HTMLDivElement | null>
}

const ConversationContext = React.createContext<ConversationContextValue | null>(null)

function useConversationContext() {
  const ctx = React.useContext(ConversationContext)
  if (!ctx) {
    throw new Error("Conversation components must be used within <Conversation>.")
  }
  return ctx
}

const Conversation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <ConversationContext.Provider value={{ contentRef }}>
      <div
        ref={ref}
        className={cn(
          "flex h-full min-h-0 flex-col rounded-2xl border border-border bg-card text-card-foreground",
          className
        )}
        {...props}
      />
    </ConversationContext.Provider>
  )
})
Conversation.displayName = "Conversation"

const ConversationContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { contentRef } = useConversationContext()

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    },
    [contentRef, ref]
  )

  return (
    <div
      ref={setRefs}
      className={cn(
        "relative flex-1 min-h-0 overflow-y-auto px-4 py-4",
        "[scrollbar-gutter:stable]",
        className
      )}
      {...props}
    />
  )
})
ConversationContent.displayName = "ConversationContent"

function ConversationEmptyState({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center text-center",
        "px-6 py-10",
        className
      )}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-2xl" />
        <Orb
          className="h-24 w-24"
          colors={["#a855f7", "#f97316"]}
          agentState={null}
          resizeDebounce={1500}
        />
      </div>

      <div className="mt-5 text-lg font-bold tracking-tight text-foreground">{title}</div>
      {description ? (
        <div className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </div>
      ) : null}
    </div>
  )
}

function isNearBottom(el: HTMLDivElement, thresholdPx: number) {
  return el.scrollHeight - el.scrollTop - el.clientHeight < thresholdPx
}

const ConversationScrollButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { contentRef } = useConversationContext()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const onScroll = () => {
      setVisible(!isNearBottom(el, 120))
    }

    onScroll()
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [contentRef])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e)
    if (e.defaultPrevented) return

    const el = contentRef.current
    if (!el) return

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={cn(
        "absolute bottom-4 right-4",
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-border bg-background/80 text-foreground shadow-sm backdrop-blur",
        "hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label="Scroll to latest"
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </button>
  )
})
ConversationScrollButton.displayName = "ConversationScrollButton"

export {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
}
