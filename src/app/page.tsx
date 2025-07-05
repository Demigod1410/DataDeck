import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, Columns, ArrowRightLeft, Palette } from "lucide-react";
import Aurora from "@/components/aurora";
import ShineBorder from "@/components/magicui/shine-border";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center container mx-auto">
        <Link href="/" className="flex items-center justify-center gap-2 font-semibold">
          <Image 
            src="/favicon.ico" 
            alt="Data Deck Logo" 
            width={24} 
            height={24} 
            className="rounded-sm"
          />
          DataDeck
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <ThemeToggle />
          <Link href="/dashboard">
            <ShineBorder
              className="text-center text-sm font-medium"
              color={["#64B5F6", "#A5D6A7"]}
              borderRadius={6}
            >
              <div className="px-4 py-2">Get Started</div>
            </ShineBorder>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Aurora colorStops={['#64B5F6', '#A5D6A7', '#64B5F6']} />
          </div>
          <div className="container px-4 md:px-6 text-center relative z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-foreground">
                  The Ultimate Toolkit <br></br> for Dynamic Data Tables
                </h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Effortlessly create, manage, and customize powerful data tables for your Next.js application. Import, export, and visualize your data with ease.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <ShineBorder
                    className="text-center text-lg font-bold"
                    color={["#64B5F6", "#A5D6A7"]}
                    borderRadius={8}
                  >
                    <div className="px-8 py-3">Get Started</div>
                  </ShineBorder>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section id="features" className="w-full min-h-screen bg-background flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to build powerful data experiences.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-8 pt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <ShineBorder
                className="h-full transition-all hover:shadow-xl hover:-translate-y-2"
                color={["#64B5F6", "#A5D6A7"]}
                borderRadius={12}
              >
                <Card className="h-full text-center border-none bg-transparent shadow-none p-6">
                  <CardHeader className="pb-6">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto">
                      <Table className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mt-4">Interactive Table</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">
                      Sort, search, and paginate your data with a fast and responsive interface.
                    </p>
                  </CardContent>
                </Card>
              </ShineBorder>
              <ShineBorder
                className="h-full transition-all hover:shadow-xl hover:-translate-y-2"
                color={["#64B5F6", "#A5D6A7"]}
                borderRadius={12}
              >
                <Card className="h-full text-center border-none bg-transparent shadow-none p-6">
                  <CardHeader className="pb-6">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto">
                      <Columns className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mt-4">Dynamic Columns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">
                      Show or hide columns on the fly. Your preferences are saved locally.
                    </p>
                  </CardContent>
                </Card>
              </ShineBorder>
              <ShineBorder
                className="h-full transition-all hover:shadow-xl hover:-translate-y-2"
                color={["#64B5F6", "#A5D6A7"]}
                borderRadius={12}
              >
                <Card className="h-full text-center border-none bg-transparent shadow-none p-6">
                  <CardHeader className="pb-6">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto">
                      <ArrowRightLeft className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mt-4">CSV Import/Export</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">
                      Easily import data from CSV files and export the current view.
                    </p>
                  </CardContent>
                </Card>
              </ShineBorder>
              <ShineBorder
                className="h-full transition-all hover:shadow-xl hover:-translate-y-2"
                color={["#64B5F6", "#A5D6A7"]}
                borderRadius={12}
              >
                <Card className="h-full text-center border-none bg-transparent shadow-none p-6">
                  <CardHeader className="pb-6">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto">
                      <Palette className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mt-4">Theme Toggle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">
                      Switch between light and dark modes for optimal viewing comfort.
                    </p>
                  </CardContent>
                </Card>
              </ShineBorder>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t container mx-auto">
        <p className="text-xs text-muted-foreground">Built By Daksh Rana</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="mailto:dakshrana1410@gmail.com" className="text-xs hover:underline underline-offset-4">
            Contact
          </a>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
