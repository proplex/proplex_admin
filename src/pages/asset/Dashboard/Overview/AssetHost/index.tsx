import { Badge } from "@/components/ui/badge"
import { Building, Info, MapPin, Phone, ChevronUp } from "lucide-react"

interface HostedByProps {
  hostedBy: {
    name: string
    address: string
    phone: string
    email: string
    website: string
    logoURL: string
    whatsappNumber: string
    about: string
  }
}

const InfoSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2 text-slate-700 font-medium">
      <Icon className="h-5 w-5" />
      <h4>{title}</h4>
    </div>
    <div className="ml-7 text-sm text-slate-600">{children}</div>
  </div>
)

export default function AssetHost({ hostedBy }: HostedByProps) {
  const {
    name,
    address,
    phone,
    email,
    website,
    logoURL,
    about,
  } = hostedBy

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Building className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Asset Host</h1>
            <p className="text-sm text-gray-500">Property ownership and management company</p>
          </div>
        </div>
        <ChevronUp className="h-5 w-5 text-slate-400" />
      </div>

      {/* Company Information */}
      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-6 text-slate-800">
          <Building className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-semibold">Company  Information</h2>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Company Logo and Name */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 flex-shrink-0 border rounded-lg overflow-hidden">
              {logoURL ? (
                <img
                  src={logoURL}
                  alt={`${name} Logo`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <Building className="h-10 w-10 text-slate-400" />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold">{name || "Unnamed Company"}</h3>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    {new URL(website).hostname}
                  </a>
                )}
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12L10 15L17 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoSection icon={MapPin} title="Headquarters">
              {address || "Not specified"}
            </InfoSection>

            <InfoSection icon={Phone} title="Contact">
              <p>{email || "No email"}</p>
              <p>{phone || "No phone"}</p>
            </InfoSection>
          </div>

          {/* About Section */}
          <InfoSection icon={Info} title="About the Company">
            <p>{about || "No description provided."}</p>
          </InfoSection>
        </div>
      </div>
    </div>
  )
}
