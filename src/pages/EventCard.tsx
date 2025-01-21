import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { cn } from "@/lib/utils"
import styles from './EventCard.module.css'

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
  title: string;
  time?: string;
  location?: string;
}


export const EventCard = ({ event, className }: EventCardProps) => {
  return (
    <Card className={cn("w-full h-full rounded-sm", className)}>
      <EventHeader
        title={event.Tittel}
        time={event.Når}
        location={event.Hvor}
      />
      <EventCollaboration collaborator={event["Samarbeid med"]} />
      <EventLinks
        ticketUrl={event["Link til TicketCo"]}
        facebookUrl={event["FB-Event"]}
        price={event["Pris S\\O"]}
      />
    </Card>
  );
}


const EventHeader = ({ title, time, location }: EventHeaderProps) => (
  <CardHeader className="space-y-4">
    <div className="flex place-content-between">
      <CardTitle className="text-xl flex tracking-wide uppercase font-bold leading-tight">
        {title}
      </CardTitle>
      <div className="flex flex-col text-right">
      {time && <p className="text-sm text-muted-foreground">{time}</p>}
      {location && <span className="uppercase">{location}</span>}
      </div>
    </div>
  </CardHeader>
);

interface EventCollaborationProps {
  collaborator?: string
}

const EventCollaboration = ({ collaborator }: EventCollaborationProps) => (
  <CardContent>
    {collaborator && (
      <p className="text-sm text-muted-foreground">
        I samarbeid med <span className="font-semibold">{collaborator}</span>
      </p>
    )}
  </CardContent>
)

interface EventLinksProps {
  ticketUrl?: string
  facebookUrl?: string
  price?: string
}

const EventLinks = ({ ticketUrl, facebookUrl, price }: EventLinksProps) => {
  const hasTickets = ticketUrl && ticketUrl !== "KOMMER"
  const hasFacebook = facebookUrl && facebookUrl !== "KOMMER"

  if (!hasTickets && !hasFacebook) return null

  return (
    <CardFooter>
      <div className={cn(styles["event-links-grid"], "gap-x-4 gap-y-1  items-start")}>
        {hasFacebook && (
          <Button asChild variant="gold" className={styles["facebook-btn"]}>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              📱 Facebook-arrangement
            </a>
          </Button>
        )}
        {price && (
          <div
            className={cn(styles["price-text"], "text-sm flex items-center")}
          >
            <span className="font-medium">💰</span>
            <span className="ml-1">CC {price}</span>
          </div>
        )}
        {hasTickets && (
          <>
            <Button
              asChild
              variant="goldOutline"
              className={styles["tickets-btn"]}
            >
              <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                🎟️ Kjøp billetter
              </a>
            </Button>
          </>
        )}
      </div>
    </CardFooter>
  );
}