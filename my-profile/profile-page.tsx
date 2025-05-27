import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "Figma",
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution built with Next.js, Stripe integration, and PostgreSQL database.",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for data visualization and analytics with real-time chart updates.",
      technologies: ["Python", "Django", "D3.js", "PostgreSQL"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Phan Thái Cường"
                width={150}
                height={150}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Phan Thái Cường</h1>
              <p className="text-xl text-gray-600 mb-4">[Chức danh/Vị trí công việc]</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>[email@example.com]</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>[Số điện thoại]</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>[Địa chỉ]</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  [Thêm mô tả về bản thân, kinh nghiệm và đam mê của bạn tại đây]
                </p>
                <p className="text-gray-700 leading-relaxed">
                  [Chia sẻ thêm về mục tiêu nghề nghiệp, sở thích cá nhân hoặc những điều đặc biệt về bạn]
                </p>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">[Tên vị trí công việc]</h3>
                    <p className="text-blue-600 font-medium mb-2">[Tên công ty] • [Thời gian làm việc]</p>
                    <p className="text-gray-700 mb-3">[Mô tả công việc và thành tích chính]</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">[Kỹ năng 1]</Badge>
                      <Badge variant="secondary">[Kỹ năng 2]</Badge>
                      <Badge variant="secondary">[Kỹ năng 3]</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">[Vị trí công việc trước đó]</h3>
                    <p className="text-blue-600 font-medium mb-2">[Tên công ty] • [Thời gian làm việc]</p>
                    <p className="text-gray-700 mb-3">[Mô tả công việc và thành tích]</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">[Kỹ năng 1]</Badge>
                      <Badge variant="secondary">[Kỹ năng 2]</Badge>
                      <Badge variant="secondary">[Kỹ năng 3]</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Featured Projects</CardTitle>
                <CardDescription>A selection of my recent work and personal projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={project.liveUrl}>
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Live Demo
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={project.githubUrl}>
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Github className="w-5 h-5 text-gray-700" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-gray-600">@phanthaicuong</p>
                    </div>
                  </Link>

                  <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-600">Phan Thái Cường</p>
                    </div>
                  </Link>

                  <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-gray-600">@cuongdev</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  I'm always open to discussing new opportunities and interesting projects.
                </p>
                <Button className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-700">Available for work</span>
                </div>
                <p className="text-sm text-gray-600">Open to full-time opportunities and freelance projects</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Phan Thái Cường. All rights reserved.</p>
            <p className="text-sm mt-2">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
