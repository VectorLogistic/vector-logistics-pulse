import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Truck,
  Edit,
  Save,
  X,
  MapPin,
  Calendar,
  User,
  Fuel,
  Gauge,
  Settings
} from "lucide-react";

const VehicleProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    brand: "",
    model: "",
    year: "",
    plateNumber: "",
    vin: "",
    color: "",
    fuelType: "",
    status: ""
  });

  // Mock vehicle data
  const mockVehicle = {
    id: id,
    brand: "MAN",
    model: "TGX 18.480",
    year: "2020",
    plateNumber: "М123УР777",
    vin: "WMA05XZZ4PM123456",
    color: "Синий",
    fuelType: "Дизель",
    status: "active",
    driver: {
      id: "1",
      name: "Иванов Иван Иванович",
      phone: "+7 (999) 123-45-67"
    },
    lastLocation: "Москва, ул. Тверская, 1",
    lastUpdate: "2024-01-15 14:30",
    mileage: "284,500 км",
    fuelLevel: "75%",
    nextMaintenance: "2024-02-15",
    insurance: "до 2024-12-31"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Активный</Badge>;
      case "maintenance":
        return <Badge variant="secondary">На ТО</Badge>;
      case "inactive":
        return <Badge variant="outline">Неактивный</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleEdit = () => {
    setEditFormData({
      brand: mockVehicle.brand,
      model: mockVehicle.model,
      year: mockVehicle.year,
      plateNumber: mockVehicle.plateNumber,
      vin: mockVehicle.vin,
      color: mockVehicle.color,
      fuelType: mockVehicle.fuelType,
      status: mockVehicle.status
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    toast({
      title: "Данные автомобиля обновлены",
      description: "Информация об автомобиле успешно сохранена.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/fleet")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к автопарку
            </Button>
            <div className="flex items-center space-x-3">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">{mockVehicle.brand} {mockVehicle.model}</h1>
                <p className="text-muted-foreground">{mockVehicle.plateNumber}</p>
              </div>
              {getStatusBadge(mockVehicle.status)}
            </div>
          </div>
          <Button onClick={handleEdit} className="flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle>Информация об автомобиле</CardTitle>
                <CardDescription>Основные данные транспортного средства</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Марка</Label>
                    <p className="text-sm text-muted-foreground">{mockVehicle.brand}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Модель</Label>
                    <p className="text-sm text-muted-foreground">{mockVehicle.model}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Год выпуска</Label>
                    <p className="text-sm text-muted-foreground">{mockVehicle.year}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Цвет</Label>
                    <p className="text-sm text-muted-foreground">{mockVehicle.color}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">VIN</Label>
                    <p className="text-sm text-muted-foreground font-mono">{mockVehicle.vin}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Тип топлива</Label>
                    <p className="text-sm text-muted-foreground">{mockVehicle.fuelType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle>Текущий статус</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Последнее местоположение</Label>
                      <p className="text-sm text-muted-foreground">{mockVehicle.lastLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Последнее обновление</Label>
                      <p className="text-sm text-muted-foreground">{mockVehicle.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gauge className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Пробег</Label>
                      <p className="text-sm text-muted-foreground">{mockVehicle.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Fuel className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Уровень топлива</Label>
                      <p className="text-sm text-muted-foreground">{mockVehicle.fuelLevel}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned Driver */}
            <Card>
              <CardHeader>
                <CardTitle>Назначенный водитель</CardTitle>
              </CardHeader>
              <CardContent>
                {mockVehicle.driver ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{mockVehicle.driver.name}</p>
                        <p className="text-sm text-muted-foreground">{mockVehicle.driver.phone}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/drivers/${mockVehicle.driver?.id}`)}
                    >
                      Открыть профиль водителя
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Водитель не назначен</p>
                )}
              </CardContent>
            </Card>

            {/* Maintenance Info */}
            <Card>
              <CardHeader>
                <CardTitle>Техническое обслуживание</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Следующее ТО</Label>
                  <p className="text-sm text-muted-foreground">{mockVehicle.nextMaintenance}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Страховка до</Label>
                  <p className="text-sm text-muted-foreground">{mockVehicle.insurance}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  История ТО
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Редактировать автомобиль</DialogTitle>
            <DialogDescription>
              Внесите изменения в информацию об автомобиле
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Марка</Label>
                <Input
                  id="brand"
                  value={editFormData.brand}
                  onChange={(e) => setEditFormData({...editFormData, brand: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="model">Модель</Label>
                <Input
                  id="model"
                  value={editFormData.model}
                  onChange={(e) => setEditFormData({...editFormData, model: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Год выпуска</Label>
                <Input
                  id="year"
                  value={editFormData.year}
                  onChange={(e) => setEditFormData({...editFormData, year: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="color">Цвет</Label>
                <Input
                  id="color"
                  value={editFormData.color}
                  onChange={(e) => setEditFormData({...editFormData, color: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="plateNumber">Государственный номер</Label>
              <Input
                id="plateNumber"
                value={editFormData.plateNumber}
                onChange={(e) => setEditFormData({...editFormData, plateNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="vin">VIN номер</Label>
              <Input
                id="vin"
                value={editFormData.vin}
                onChange={(e) => setEditFormData({...editFormData, vin: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fuelType">Тип топлива</Label>
                <Select value={editFormData.fuelType} onValueChange={(value) => setEditFormData({...editFormData, fuelType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип топлива" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Дизель</SelectItem>
                    <SelectItem value="petrol">Бензин</SelectItem>
                    <SelectItem value="gas">Газ</SelectItem>
                    <SelectItem value="electric">Электричество</SelectItem>
                    <SelectItem value="hybrid">Гибрид</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Статус</Label>
                <Select value={editFormData.status} onValueChange={(value) => setEditFormData({...editFormData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="maintenance">На ТО</SelectItem>
                    <SelectItem value="inactive">Неактивный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Отмена
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default VehicleProfile;