
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { getAllQRCodes, getQRCodesStats } from '@/utils/qrCodeStorage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, QrCode, LogOut } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { isLoggedIn, logout } = useAdminAuth();
  const { settings, updateSettings } = useSiteSettings();
  const { toast } = useToast();
  
  // Settings form state
  const [siteName, setSiteName] = useState(settings.siteName);
  const [metaTitle, setMetaTitle] = useState(settings.metaTitle);
  const [metaDescription, setMetaDescription] = useState(settings.metaDescription);
  const [metaKeywords, setMetaKeywords] = useState(settings.metaKeywords);
  
  // Get QR code data from localStorage
  const qrCodes = getAllQRCodes();
  const stats = getQRCodesStats();
  
  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  const handleSaveSettings = () => {
    updateSettings({
      siteName,
      metaTitle,
      metaDescription,
      metaKeywords
    });
    toast({
      title: "Settings saved",
      description: "Website settings have been updated",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total QR Codes Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-crypto-purple mr-3" />
              <span className="text-3xl font-bold">{stats.totalGenerated}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Download className="h-8 w-8 text-crypto-lightPurple mr-3" />
              <span className="text-3xl font-bold">{stats.totalDownloaded}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="qrcodes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="qrcodes">QR Code History</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="qrcodes">
          <Card>
            <CardHeader>
              <CardTitle>Generated QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Text/URL</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Downloaded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qrCodes.length > 0 ? (
                      qrCodes.map((qrCode, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium max-w-xs truncate">
                            {qrCode.value}
                          </TableCell>
                          <TableCell>{formatDate(qrCode.createdAt)}</TableCell>
                          <TableCell>
                            {qrCode.downloaded ? (
                              <span className="text-green-600">Yes</span>
                            ) : (
                              <span className="text-gray-500">No</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                          No QR codes have been generated yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Website Name</Label>
                  <Input 
                    id="siteName" 
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle" 
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    The title that appears in search engine results
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Input 
                    id="metaDescription" 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    A brief description of your website for search engines
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input 
                    id="metaKeywords" 
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated keywords related to your website
                  </p>
                </div>
                
                <Button 
                  onClick={handleSaveSettings} 
                  className="bg-gradient-to-r from-crypto-lightPurple to-crypto-purple"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link to="/">
            Back to Website
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
