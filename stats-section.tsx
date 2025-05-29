import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Building, MapPin } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Alumni",
      description: "Graduates making impact worldwide",
      color: "text-blue-600",
    },
    {
      icon: Building,
      number: "500+",
      label: "Partner Companies",
      description: "Offering exclusive opportunities",
      color: "text-green-600",
    },
    {
      icon: MapPin,
      number: "80+",
      label: "Countries",
      description: "Global alumni presence",
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Employment Rate",
      description: "Within 6 months of graduation",
      color: "text-orange-600",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Impact in Numbers</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how our alumni community continues to grow and make a difference across industries and continents.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <h3 className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</h3>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
