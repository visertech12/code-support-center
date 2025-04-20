
interface QRCodeData {
  value: string;
  createdAt: string;
  downloaded?: boolean;
}

export const saveQRCodeData = (value: string, downloaded: boolean = false): void => {
  try {
    // Get existing QR codes or initialize empty array
    const existingData = localStorage.getItem('qrCodes');
    const qrCodes: QRCodeData[] = existingData ? JSON.parse(existingData) : [];
    
    // Add new QR code data
    qrCodes.push({
      value,
      createdAt: new Date().toISOString(),
      downloaded
    });
    
    // Save back to localStorage
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes));
  } catch (error) {
    console.error('Error saving QR code data to localStorage:', error);
  }
};

export const getAllQRCodes = (): QRCodeData[] => {
  try {
    const data = localStorage.getItem('qrCodes');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving QR code data from localStorage:', error);
    return [];
  }
};

export const markQRCodeAsDownloaded = (value: string, createdAt: string): void => {
  try {
    const existingData = localStorage.getItem('qrCodes');
    if (!existingData) return;
    
    const qrCodes: QRCodeData[] = JSON.parse(existingData);
    const updatedQRCodes = qrCodes.map(qrCode => {
      if (qrCode.value === value && qrCode.createdAt === createdAt) {
        return { ...qrCode, downloaded: true };
      }
      return qrCode;
    });
    
    localStorage.setItem('qrCodes', JSON.stringify(updatedQRCodes));
  } catch (error) {
    console.error('Error marking QR code as downloaded:', error);
  }
};

export const getQRCodesStats = () => {
  const qrCodes = getAllQRCodes();
  const totalGenerated = qrCodes.length;
  const totalDownloaded = qrCodes.filter(qr => qr.downloaded).length;
  
  return {
    totalGenerated,
    totalDownloaded,
  };
};
