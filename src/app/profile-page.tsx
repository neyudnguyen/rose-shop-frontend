'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
  // Thông tin cá nhân của Cuong - một trong những người tạo ra dự án Rose Shop
  const cuongData = {
    full_name: 'Phan Thái Cường',
    address: 'Hà Nội, Việt Nam',
    birth_date: '2002-03-15',
    sex: 'Nam',
    points: 2500,
    is_seller: true,
    created_date: '2024-01-01',
    email: 'cuong.nguyen@roseshop.com',
    phone: '+84 987 654 321',
    role: 'Co-Founder & Lead Developer',
    bio: 'Passionate developer with expertise in React, Next.js, and modern web technologies. Co-founded Rose Shop to bring beautiful flowers to everyone.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Database Design'],
    github: 'https://github.com/cuong-nguyen',
    linkedin: 'https://linkedin.com/in/cuong-nguyen-dev'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Cuong's Profile</h1>
          <p className="text-gray-600">Co-Founder & Lead Developer of Rose Shop</p>
          <div className="mt-4">
            <Badge variant="default" className="text-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500">
              🌹 Rose Shop Team Member
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {cuongData.full_name.charAt(0)}
                </div>
                <CardTitle className="text-xl">{cuongData.full_name}</CardTitle>
                <CardDescription className="text-sm font-medium text-purple-600">
                  {cuongData.role}
                </CardDescription>
                <CardDescription className="mt-2">
                  Team member since {new Date(cuongData.created_date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {cuongData.points} Points
                  </Badge>
                  <Separator />
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    ✅ Verified Developer
                  </Badge>
                  <Badge variant={cuongData.is_seller ? "default" : "outline"}>
                    {cuongData.is_seller ? 'Seller Account' : 'Customer'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Developer Information</CardTitle>
                <CardDescription>
                  Personal details and professional information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-gray-900">{cuongData.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 font-medium text-purple-600">{cuongData.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-gray-900">{cuongData.sex}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Birth Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(cuongData.birth_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{cuongData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-gray-900">{cuongData.phone}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-gray-900">{cuongData.address}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <p className="mt-1 text-gray-900">{cuongData.bio}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Technical Skills</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cuongData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                    📧 Contact Cuong
                  </Button>
                  <Button variant="outline" onClick={() => window.open(cuongData.github, '_blank')}>
                    🔗 GitHub Profile
                  </Button>
                  <Button variant="outline" onClick={() => window.open(cuongData.linkedin, '_blank')}>
                    💼 LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Developer Contributions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Contributions to Rose Shop</CardTitle>
              <CardDescription>
                Key areas where Cuong has contributed to the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-purple-50">
                  <span className="text-2xl">⚛️</span>
                  <span className="text-sm">Frontend Development</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-purple-50">
                  <span className="text-2xl">🗄️</span>
                  <span className="text-sm">Database Design</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-purple-50">
                  <span className="text-2xl">🎨</span>
                  <span className="text-sm">UI/UX Design</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-purple-50">
                  <span className="text-2xl">🚀</span>
                  <span className="text-sm">Project Management</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Stats */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Statistics</CardTitle>
              <CardDescription>
                Cuong's impact on the Rose Shop project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <div className="text-sm text-gray-600 mt-1">Commits</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600 mt-1">Components Built</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Dedication</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
