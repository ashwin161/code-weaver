import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProjectDetail = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/#work" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Works
        </Link>
        
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 capitalize">
            {slug?.replace(/-/g, " ")}
          </h1>
          
          {/* Placeholder for project image */}
          <div className="aspect-video bg-secondary/30 border-2 border-dashed border-border rounded-2xl flex items-center justify-center mb-8">
            <p className="text-muted-foreground">Project image will be displayed here</p>
          </div>
          
          {/* Placeholder for project content */}
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Add your project details, description, and content here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
