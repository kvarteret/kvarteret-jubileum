import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
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
    <Card className={cn("w-full h-full max-w-md", className)}>
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
  <CardHeader>
    <div className="flex justify-between items-start">
      <CardTitle className="text-xl">{title}</CardTitle>
      <div className="text-right">
        <p className="text-sm font-medium">{date}</p>
        {time && <p className="text-sm">{time}</p>}
      </div>
    </div>
    <CardDescription>
      {location && <p>{location}</p>}
      {price && <p>Pris: {price}</p>}
    </CardDescription>
  </CardHeader>
)

interface EventCollaborationProps {
  collaborator?: string
}

const EventCollaboration = ({ collaborator }: EventCollaborationProps) => (
  <CardContent>
    {collaborator && (
      <p className="text-sm">I samarbeid med: {collaborator}</p>
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
    <CardFooter className="gap-4">
      {hasTickets && (
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-gold hover:underline"
        >
          Kjøp billetter
        </a>
      )}
      {hasFacebook && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-gold hover:underline"
        >
          Facebook-arrangement
        </a>
      )}
    </CardFooter>
  )
}
