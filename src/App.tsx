import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Suspense, lazy } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SoundEffectsProvider } from "@/components/ui/SoundEffects";
import { KidcoreCursor } from "@/components/ui/KidcoreCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import Index from "./pages/Index";
import Register from "./pages/Register";
import UnifiedRegistration from "./pages/UnifiedRegistration";
import NotFound from "./pages/NotFound";
import ViewMap from "./pages/ViewMap";
import CampusExplorer from "./pages/CampusExplorer";
import AboutUs from "./pages/AboutUs";
import History from "./pages/History";
import Schedule from "./pages/Schedule";
import Events from "./pages/Events";
import Merch from "./pages/Merch";
import Sponsors from "./pages/Sponsors";
import Hierarchy from "./pages/Hierarchy";
import ContactUs from "./pages/ContactUs";
import { Guidelines } from "./pages/Guidelines";
import ResponsiveTest from "./pages/ResponsiveTest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReturnAndRefund from "./pages/ReturnAndRefund";
import Scan from "./pages/Scan";

// Lazy load Gallery for better initial load performance and loading screen support
const Gallery = lazy(() => import("./pages/Gallery"));

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
                                <Route path="/view-map" element={<ViewMap />} />
                                <Route path="/campus-explorer" element={<CampusExplorer />} />
                                <Route path="/schedule" element={<Schedule />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/merch" element={<Merch />} />
                                <Route path="/sponsors" element={<Sponsors />} />
                                <Route path="/hierarchy" element={<Hierarchy />} />
                                {/* <Route path="/scan" element={<Scan />} /> */}
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
