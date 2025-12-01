import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LucideIcon } from "lucide-react";

interface DivisionCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  onLearnMore: (division: string) => void;
}

export default function DivisionCard({
  title,
  description,
  features,
  icon: Icon,
  gradientFrom,
  gradientTo,
  onLearnMore
}: DivisionCardProps) {
  return (
    <Card className="h-full hover-elevate transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <Badge variant="outline" className="text-xs">
            Division
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
{features.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Features:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li 
                key={index} 
                className="text-sm text-muted-foreground flex items-center"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full justify-between group-hover:bg-primary/10 transition-colors mt-6"
          onClick={() => onLearnMore(title)}
          data-testid={`button-learn-more-${title.toLowerCase()}`}
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}