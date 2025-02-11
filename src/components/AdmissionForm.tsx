import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const AdmissionForm = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    handlePrint(formData);
  };

  const handlePrint = (formData: FormData) => {
    const printWindow = window.open("", "", "height=600,width=800");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>DHI Classes - Admission Form</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 40px; 
                max-width: 800px;
                margin: 0 auto;
                line-height: 1.6;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #000;
                padding-bottom: 20px;
                position: relative;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                color: #1d4ed8;
              }
              .header p {
                margin: 5px 0 0;
                font-size: 14px;
              }
              .photo-box {
                position: absolute;
                top: 0;
                right: 0;
                border: 1px solid #000;
                width: 120px;
                height: 150px;
                background-size: cover;
                background-position: center;
              }
              .form-section {
                margin-bottom: 30px;
                clear: both;
              }
              .form-section h2 {
                font-size: 18px;
                margin-bottom: 15px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
              }
              .form-row { 
                margin-bottom: 20px;
                display: flex;
              }
              .label { 
                font-weight: bold;
                width: 180px;
                padding-right: 20px;
              }
              .value {
                flex: 1;
                border-bottom: 1px dotted #999;
                min-height: 24px;
                padding: 3px 0;
              }
              .footer {
                margin-top: 50px;
                display: flex;
                justify-content: space-between;
              }
              .signature-line {
                border-top: 1px solid #000;
                width: 200px;
                text-align: center;
                padding-top: 5px;
              }
              .date {
                text-align: right;
                margin-top: 30px;
              }
              @media print {
                body { padding: 20px; }
                .header h1 { color: #000; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>DHI Classes</h1>
              <p>Admission Application Form</p>
              <p>Academic Year 2024-25</p>
              ${
                photoPreview
                  ? `<div class="photo-box" style="background-image: url('${photoPreview}')"></div>`
                  : '<div class="photo-box"><div style="text-align: center; padding-top: 60px; color: #666;">Photo</div></div>'
              }
            </div>

            <div class="form-section">
              <h2>Student Information</h2>
              <div class="form-row">
                <div class="label">Class Applied For:</div>
                <div class="value">${formData.get("class") || ""}</div>
              </div>
              <div class="form-row">
                <div class="label">Student's Full Name:</div>
                <div class="value">${formData.get("studentName") || ""}</div>
              </div>
              <div class="form-row">
                <div class="label">Date of Birth:</div>
                <div class="value">${formData.get("dob") || ""}</div>
              </div>
            </div>

            <div class="form-section">
              <h2>Parent/Guardian Information</h2>
              <div class="form-row">
                <div class="label">Father's Name:</div>
                <div class="value">${formData.get("fatherName") || ""}</div>
              </div>
              <div class="form-row">
                <div class="label">Mother's Name:</div>
                <div class="value">${formData.get("motherName") || ""}</div>
              </div>
            </div>

            <div class="form-section">
              <h2>Contact Information</h2>
              <div class="form-row">
                <div class="label">Address:</div>
                <div class="value">${formData.get("address") || ""}</div>
              </div>
              <div class="form-row">
                <div class="label">Phone Number:</div>
                <div class="value">${formData.get("phone") || ""}</div>
              </div>
              <div class="form-row">
                <div class="label">Email:</div>
                <div class="value">${formData.get("email") || ""}</div>
              </div>
            </div>

            <div class="footer">
              <div>
                <div class="signature-line">Student's Signature</div>
              </div>
              <div>
                <div class="signature-line">Parent's/Guardian's Signature</div>
              </div>
            </div>

            <div class="date">
              Date: ${new Date().toLocaleDateString()}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Admission Form</CardTitle>
          <CardDescription>
            Please fill out all the required information for admission
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-6">
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center space-y-4">
                <Label htmlFor="photo">Student Photo</Label>
                <div className="relative">
                  <Avatar className="w-32 h-40 rounded-md">
                    {photoPreview ? (
                      <AvatarImage
                        src={photoPreview}
                        alt="Student photo"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="rounded-md">
                        Upload Photo
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                    onClick={() => document.getElementById("photo")?.click()}
                  >
                    Upload
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a recent passport-size photograph
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Select name="class">
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    placeholder="Enter student's full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    name="fatherName"
                    placeholder="Enter father's name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="motherName">Mother's Name</Label>
                  <Input
                    id="motherName"
                    name="motherName"
                    placeholder="Enter mother's name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" required />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter complete address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Submit & Print</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdmissionForm;
