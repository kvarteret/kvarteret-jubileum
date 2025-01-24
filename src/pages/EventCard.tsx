import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { cn } from "@/lib/utils"
import ticketSvg from "../assets/ticket.svg?raw"
import facebookSvg from "../assets/fb.svg?raw"

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
    <div className="flex flex-col">
      <CardTitle className="text-xl flex tracking-wide uppercase font-bold leading-tight mr-8">
        {title}
      </CardTitle>
      <div className="flex flex-col ">
      {location && <span className="uppercase">{location}</span>}
      {time && <p className="text-sm text-muted-foreground">{time}</p>}
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


  return (
    <CardFooter>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-2 w-full
        [grid-template-areas:'._.'_'facebook_facebook'_'price_tickets'] 
        md:[grid-template-areas:'._price'_'facebook_tickets']">
        {hasFacebook && (
          <Button asChild variant="gold" className="[grid-area:facebook] w-full md:w-auto">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <span className="inline text-primary-gold items-center" dangerouslySetInnerHTML={{ __html: facebookSvg }} />
              Til Arrangement
            </a>
          </Button>
        )}
        {price && (
          <div className="[grid-area:price] text-sm flex items-center justify-self-end md:justify-self-center">
            <span className="font-medium">💰</span>
            <span className="ml-1">CC {price}</span>
          </div>
        )}
        {hasTickets && (
          <Button asChild variant="goldOutline" className="[grid-area:tickets] w-full md:justify-self-end">
            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
              <span className="inline text-primary-gold" dangerouslySetInnerHTML={{ __html: ticketSvg }} />
              Kjøp Billetter
            </a>
          </Button>
        )}
      </div>
    </CardFooter>
  );
}