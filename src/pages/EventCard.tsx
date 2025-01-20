import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { cn } from "@/lib/utils"

interface Event {
  Dato: string
  Når: string
  Dag: string
  Hvor: string
  Tittel: string
  "Pris S\\O": string
  "FB-Event": string
  "Link til TicketCo": string
  "Samarbeid med": string
}

interface EventCardProps {
  event: Event
  className?: string
}

interface EventHeaderProps {
  title: string
  date: string
  time?: string
  location?: string
  price?: string
}


export const EventCard = ({ event, className }: EventCardProps) => {
  return (
    <Card className={cn("w-full h-full rounded-sm", className)}>
      <EventHeader
        title={event.Tittel}
        date={event.Dato}
        time={event.Når}
        location={event.Hvor}
        price={event["Pris S\\O"]}
      />
      <EventCollaboration
        collaborator={event["Samarbeid med"]}
      />
      <EventLinks
        ticketUrl={event["Link til TicketCo"]}
        facebookUrl={event["FB-Event"]}
      />
    </Card>
  )
}


const EventHeader = ({ title, date, time, location, price }: EventHeaderProps) => (
  <CardHeader className="space-y-4">
    <div className="flex justify-between items-start gap-4">
      <CardTitle className="text-xl flex tracking-wide uppercase font-bold leading-tight">{title}</CardTitle>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-primary-gold">{date}</p>
        {time && <p className="text-sm text-muted-foreground">{time}</p>}
      </div>
    </div>
    <CardDescription>
      {location && (
        <div className="flex items-center text-sm">
          <span className="font-medium">📍</span>
          <span className="ml-1">{location}</span>
        </div>
      )}
      {price && (
        <div className="flex items-center text-sm">
          <span className="font-medium">💰</span>
          <span className="ml-1">CC {price}</span>
        </div>
      )}
    </CardDescription>
  </CardHeader>
)

interface EventCollaborationProps {
  collaborator?: string
}

const EventCollaboration = ({ collaborator }: EventCollaborationProps) => (
  <CardContent>
    {collaborator && (
      <p className="text-sm text-muted-foreground italic">
        I samarbeid med <span className="font-medium not-italic">{collaborator}</span>
      </p>
    )}
  </CardContent>
)

interface EventLinksProps {
  ticketUrl?: string
  facebookUrl?: string
}

const EventLinks = ({ ticketUrl, facebookUrl }: EventLinksProps) => {
  const hasTickets = ticketUrl && ticketUrl !== "KOMMER"
  const hasFacebook = facebookUrl && facebookUrl !== "KOMMER"

  if (!hasTickets && !hasFacebook) return null

  return (
    <CardFooter className="gap-4 flex flex-wrap">
      {hasTickets && (
        <Button
          asChild
          variant="gold"
        >
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🎟️ Kjøp billetter
          </a>
        </Button>
      )}
      {hasFacebook && (
        <Button
          asChild
          variant="goldOutline"
        >
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            📱 Facebook-arrangement
          </a>
        </Button>
      )}
    </CardFooter>
  )
}

