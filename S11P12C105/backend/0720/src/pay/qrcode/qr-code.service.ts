// // src/qr-code.service.ts 
// import { Injectable } from  '@nestjs/common' ; 
// import * as qrcode from  'qrcode' ; 

// @Injectable () 
// export  class  QrCodeService { 
//   async  generateQrCode ( data : string ): Promise < string > { 
//     try { 
//       const qrCodeDataURL = await qrcode.toDataURL (data); return qrCodeDataURL;     } catch (error) { throw new Error ( 'QR 코드 생성에 실패했습니다.' ) ;     }   } }