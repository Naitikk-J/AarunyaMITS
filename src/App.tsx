import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Suspense, lazy } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { SoundEffectsProvider } from "@/components/ui/SoundEffects";
import { KidcoreCursor } from "@/components/ui/KidcoreCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// ─── Lazy-loaded pages for route-level code splitting ───
// Only the code for the current route is downloaded, not ALL pages
const Index = lazy(() => import("./pages/Index"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Register = lazy(() => import("./pages/Register"));
const UnifiedRegistration = lazy(() => import("./pages/UnifiedRegistration"));
const MyRegistrations = lazy(() => import("./pages/MyRegistrations"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ViewMap = lazy(() => import("./pages/ViewMap"));
const CampusExplorer = lazy(() => import("./pages/CampusExplorer"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const History = lazy(() => import("./pages/History"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Events = lazy(() => import("./pages/Events"));
const Merch = lazy(() => import("./pages/Merch"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Hierarchy = lazy(() => import("./pages/Hierarchy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Guidelines = lazy(() => import("./pages/Guidelines"));
const ResponsiveTest = lazy(() => import("./pages/ResponsiveTest"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const ReturnAndRefund = lazy(() => import("./pages/ReturnAndRefund"));
const Scan = lazy(() => import("./pages/Scan"));

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <SoundEffectsProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <KidcoreCursor />
                <SmoothScroll />
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}>
                            <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/unified-registration" element={<UnifiedRegistration />} />
                                <Route path="/my-registrations" element={<MyRegistrations />} />
                                <Route path="/view-map" element={<ViewMap />} />
                                <Route path="/campus-explorer" element={<CampusExplorer />} />
                                <Route path="/schedule" element={<Schedule />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/merch" element={<Merch />} />
                                <Route path="/sponsors" element={<Sponsors />} />
                                <Route path="/hierarchy" element={<Hierarchy />} />
                                <Route path="/scan" element={<Scan />} />
                                <Route path="/contact" element={<ContactUs />} />
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/history" element={<History />} />
                                <Route path="/guidelines" element={<Guidelines />} />
                                <Route path="/responsive-test" element={<ResponsiveTest />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                                <Route path="/return-and-refund" element={<ReturnAndRefund />} />
                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </PageTransition>
                </BrowserRouter>
            </TooltipProvider>
        </SoundEffectsProvider>
    </QueryClientProvider>
);

export default App;