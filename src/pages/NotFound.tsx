import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { RetroTvError } from "@/components/ui/404-error-page";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#0D001A] overflow-hidden">
      <RetroTvError 
        errorCode="404" 
        errorMessage={`SIGNAL LOST AT ${location.pathname}`}
      />
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <Link 
          to="/" 
          className="kidcore-btn group"
        >
          <span className="relative z-10 flex items-center gap-2">
            RETURN TO BASE
          </span>
        </Link>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyber-grape/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-slime-green/10 blur-3xl rounded-full" />
    </div>
  );
};

export default NotFound;
