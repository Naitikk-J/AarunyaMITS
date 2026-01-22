import { MainNavigation } from '@/components/ui/MainNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'Alex Chen',
            role: 'Lead Developer',
            department: 'Computer Science',
            year: 'Senior',
            bio: 'Passionate about creating immersive digital experiences and pushing the boundaries of web technology.',
            skills: ['React', 'Three.js', 'TypeScript', 'UI/UX'],
            avatar: '🧑‍💻'
        },
        {
            name: 'Maya Rodriguez',
            role: '3D Graphics Specialist',
            department: 'Digital Arts',
            year: 'Junior',
            bio: 'Combining artistic vision with technical expertise to create stunning 3D environments and animations.',
            skills: ['Blender', 'WebGL', 'Shaders', 'Animation'],
            avatar: '👩‍🎨'
        },
        {
            name: 'Jordan Kim',
            role: 'UX Designer',
            department: 'Human-Computer Interaction',
            year: 'Senior',
            bio: 'Focused on creating intuitive and accessible interfaces that enhance user experience and engagement.',
            skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
            avatar: '🧑‍🎨'
        },
        {
            name: 'Sam Taylor',
            role: 'Backend Developer',
            department: 'Software Engineering',
            year: 'Junior',
            bio: 'Building robust and scalable systems to support our interactive campus exploration platform.',
            skills: ['Node.js', 'Database', 'APIs', 'Cloud Services'],
            avatar: '👨‍💻'
        }
    ];

    const technologies = [
        { name: 'React 18', category: 'Frontend', description: 'Modern UI framework' },
        { name: 'Three.js', category: '3D Graphics', description: 'WebGL-based 3D library' },
        { name: 'TypeScript', category: 'Language', description: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework' },
        { name: 'Vite', category: 'Build Tool', description: 'Fast development server' },
        { name: 'React Router', category: 'Navigation', description: 'Client-side routing' }
    ];

    const achievements = [
        {
            title: 'Best Innovation Award',
            year: '2024',
            description: 'Recognized for creating an immersive campus exploration experience'
        },
        {
            title: 'Student Project Excellence',
            year: '2023',
            description: 'Outstanding technical implementation and user experience design'
        },
        {
            title: 'Campus Impact Recognition',
            year: '2023',
            description: 'Significant contribution to campus community engagement'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <MainNavigation />

            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-b from-kidcore-blue/20 via-kidcore-pink/10 to-transparent py-16">
                <div className="absolute inset-0 scanlines opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-kidcore-blue via-kidcore-pink to-kidcore-orange bg-clip-text text-transparent animate-rainbow">
                        ABOUT US
                    </h1>
                    <p className="text-xl text-center text-kidcore-cream font-rajdhani max-w-3xl mx-auto">
                        Meet the team behind Euphoria Campus Explorer and discover our mission to create immersive digital experiences
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Mission Statement */}
                <div className="mb-16">
                    <Card className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="font-orbitron text-2xl text-kidcore-yellow text-center">
                                Our Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-lg text-kidcore-cream font-rajdhani max-w-4xl mx-auto leading-relaxed">
                                We believe in pushing the boundaries of digital interaction by creating immersive,
                                accessible, and engaging experiences that bring campus life to life. Our goal is to
                                bridge the gap between physical and digital spaces, making exploration intuitive and fun.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 bg-gradient-to-r from-kidcore-blue to-kidcore-pink bg-clip-text text-transparent">
                        MEET THE TEAM
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl group relative overflow-hidden hover:border-kidcore-pink/50 transition-all duration-300 floating-sticker">
                                <div className="h-32 bg-gradient-to-br from-kidcore-blue/20 to-kidcore-pink/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 scanlines opacity-20" />
                                    <div className="text-6xl">{member.avatar}</div>
                                </div>

                                <CardHeader>
                                    <CardTitle className="font-orbitron text-lg text-kidcore-yellow">
                                        {member.name}
                                    </CardTitle>
                                    <CardDescription className="font-rajdhani text-kidcore-cream">
                                        {member.role}
                                    </CardDescription>
                                    <div className="text-sm text-kidcore-green font-mono">
                                        {member.department} • {member.year}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-kidcore-cream font-rajdhani text-sm mb-4">
                                        {member.bio}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {member.skills.map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="outline" className="font-mono text-xs text-kidcore-orange border-kidcore-orange/50">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-kidcore-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Technologies Used */}
                <div className="mb-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 bg-gradient-to-r from-kidcore-blue to-kidcore-pink bg-clip-text text-transparent">
                        TECHNOLOGIES WE USE
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technologies.map((tech, index) => (
                            <Card key={index} className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl hover:border-kidcore-pink/50 transition-all duration-300 floating-sticker">
                                <CardHeader>
                                    <CardTitle className="font-orbitron text-lg text-kidcore-yellow">
                                        {tech.name}
                                    </CardTitle>
                                    <Badge variant="outline" className="font-mono text-xs text-kidcore-green border-kidcore-green/50">
                                        {tech.category}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-kidcore-cream font-rajdhani text-sm">
                                        {tech.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Achievements */}
                <div className="mb-16">
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-12 bg-gradient-to-r from-kidcore-blue to-kidcore-pink bg-clip-text text-transparent">
                        ACHIEVEMENTS
                    </h2>
                    <div className="space-y-6">
                        {achievements.map((achievement, index) => (
                            <Card key={index} className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl floating-sticker">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="font-orbitron text-lg text-kidcore-yellow">
                                            {achievement.title}
                                        </CardTitle>
                                        <Badge variant="outline" className="font-mono text-sm text-kidcore-yellow border-kidcore-yellow/50">
                                            {achievement.year}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-kidcore-cream font-rajdhani">
                                        {achievement.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact & Collaboration */}
                <div className="mb-16">
                    <Card className="glass-card border-kidcore-blue/60 bg-background/85 backdrop-blur-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="font-orbitron text-2xl text-kidcore-yellow text-center">
                                Let's Collaborate
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-kidcore-cream font-rajdhani mb-6 max-w-3xl mx-auto">
                                    Interested in joining our team or have an idea for collaboration?
                                    We're always looking for passionate individuals who want to create amazing digital experiences.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Button className="font-orbitron text-sm tracking-wider kidcore-btn">
                                        JOIN THE TEAM
                                    </Button>
                                    <Button variant="outline" className="font-orbitron text-sm tracking-wider border-kidcore-blue/40 text-kidcore-yellow hover:text-kidcore-orange">
                                        COLLABORATE
                                    </Button>
                                    <Button variant="outline" className="font-orbitron text-sm tracking-wider border-kidcore-blue/40 text-kidcore-yellow hover:text-kidcore-orange">
                                        GIVE FEEDBACK
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer decoration */}
            <div className="fixed bottom-6 left-6 w-20 h-0.5 bg-gradient-to-r from-kidcore-blue to-transparent" />
            <div className="fixed bottom-6 left-6 w-0.5 h-20 bg-gradient-to-t from-kidcore-blue to-transparent" />
            <div className="fixed bottom-6 right-6 w-20 h-0.5 bg-gradient-to-l from-kidcore-pink to-transparent" />
            <div className="fixed bottom-6 right-6 w-0.5 h-20 bg-gradient-to-t from-kidcore-pink to-transparent" />
        </div>
    );
};

export default AboutUs;
