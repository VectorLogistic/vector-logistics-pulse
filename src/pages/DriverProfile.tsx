import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Car,
  MapPin,
  TrendingUp,
  Wallet,
  Clock,
  Route,
  Edit,
  Coins,
  Award,
  BarChart3
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  hourlyRate: number;
  status: "available" | "busy" | "unavailable";
  currentVehicle: string | null;
  totalTrips: number;
  experience: string;
  joinDate: string;
  salaryType: "salary" | "hourly" | "per_km";
  monthlyEarnings: number;
  thisMonthTrips: number;
  thisMonthKm: number;
  thisMonthHours: number;
  address: string;
  licenseNumber: string;
  licenseExpiry: string;
}

const DriverProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    hourlyRate: "",
    salaryType: "",
    address: "",
    licenseNumber: "",
    licenseExpiry: ""
  });

  // Мокированные данные водителей (в реальном приложении будут из API)
  const mockDrivers: Driver[] = [
    {
      id: "1",
      name: "Петров Иван Сергеевич",
      phone: "+7 (999) 123-45-67",
      email: "petrov@example.com",
      hourlyRate: 350,
      status: "available",
      currentVehicle: "Toyota Camry (А123ВС777)",
      totalTrips: 1247,
      experience: "5 лет",
      joinDate: "2019-03-15",
      salaryType: "hourly",
      monthlyEarnings: 85000,
      thisMonthTrips: 156,
      thisMonthKm: 3420,
      thisMonthHours: 182,
      address: "г. Москва, ул. Ленина, д. 15, кв. 42",
      licenseNumber: "7799 123456",
      licenseExpiry: "2027-05-20"
    },
    {
      id: "2", 
      name: "Сидорова Мария Александровна",
      phone: "+7 (987) 654-32-10",
      email: "sidorova@example.com",
      hourlyRate: 320,
      status: "busy",
      currentVehicle: "Hyundai Solaris (В456ТР199)",
      totalTrips: 892,
      experience: "3 года",
      joinDate: "2021-07-01",
      salaryType: "per_km",
      monthlyEarnings: 78000,
      thisMonthTrips: 134,
      thisMonthKm: 2890,
      thisMonthHours: 168,
      address: "г. Москва, пр. Мира, д. 32, кв. 18",
      licenseNumber: "7799 654321",
      licenseExpiry: "2026-11-15"
    },
    {
      id: "3",
      name: "Козлов Дмитрий Владимирович", 
      phone: "+7 (911) 111-22-33",
      email: "kozlov@example.com",
      hourlyRate: 380,
      status: "available",
      currentVehicle: null,
      totalTrips: 2156,
      experience: "8 лет",
      joinDate: "2016-01-10",
      salaryType: "salary",
      monthlyEarnings: 95000,
      thisMonthTrips: 189,
      thisMonthKm: 4200,
      thisMonthHours: 195,
      address: "г. Москва, ул. Арбат, д. 7, кв. 55",
      licenseNumber: "7799 987654",
      licenseExpiry: "2028-03-10"
    }
  ];

  useEffect(() => {
    const foundDriver = mockDrivers.find(d => d.id === id);
    setDriver(foundDriver || null);
  }, [id]);

  const getStatusBadge = (status: Driver["status"]) => {
    switch (status) {
      case "available":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Доступен</Badge>;
      case "busy":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Занят</Badge>;
      case "unavailable":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Недоступен</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getSalaryTypeText = (type: Driver["salaryType"]) => {
    switch (type) {
      case "salary":
        return "Оклад";
      case "hourly":
        return "Почасовая оплата";
      case "per_km":
        return "За километр";
      default:
        return "Не указано";
    }
  };

  const handleEditClick = () => {
    if (driver) {
      setEditForm({
        name: driver.name,
        phone: driver.phone,
        email: driver.email,
        hourlyRate: driver.hourlyRate.toString(),
        salaryType: driver.salaryType,
        address: driver.address,
        licenseNumber: driver.licenseNumber,
        licenseExpiry: driver.licenseExpiry
      });
    }
  };

  const handleSaveChanges = () => {
    if (driver) {
      // В реальном приложении здесь был бы API-запрос для обновления данных
      const updatedDriver = {
        ...driver,
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email,
        hourlyRate: parseInt(editForm.hourlyRate) || driver.hourlyRate,
        salaryType: editForm.salaryType as Driver["salaryType"],
        address: editForm.address,
        licenseNumber: editForm.licenseNumber,
        licenseExpiry: editForm.licenseExpiry
      };
      
      setDriver(updatedDriver);
      setIsEditDialogOpen(false);
      
      // Здесь можно добавить уведомление об успешном сохранении
      console.log("Данные водителя обновлены:", updatedDriver);
    }
  };

  if (!driver) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Водитель не найден</h2>
            <Button onClick={() => navigate("/drivers")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Хедер с кнопкой назад */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/drivers")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              К списку водителей
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Профиль водителя</h1>
              <p className="text-muted-foreground">Подробная информация и аналитика</p>
            </div>
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleEditClick}>
                <Edit className="w-4 h-4 mr-2" />
                Редактировать профиль
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Редактировать профиль водителя</DialogTitle>
                <DialogDescription>
                  Измените информацию о водителе
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editName">ФИО</Label>
                    <Input 
                      id="editName" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editPhone">Телефон</Label>
                    <Input 
                      id="editPhone" 
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editEmail">Email</Label>
                    <Input 
                      id="editEmail" 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editHourlyRate">Ставка за час (₽)</Label>
                    <Input 
                      id="editHourlyRate" 
                      type="number"
                      value={editForm.hourlyRate}
                      onChange={(e) => setEditForm({...editForm, hourlyRate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editSalaryType">Тип расчета</Label>
                  <Select value={editForm.salaryType} onValueChange={(value) => setEditForm({...editForm, salaryType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип расчета" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Оклад</SelectItem>
                      <SelectItem value="hourly">Почасовая оплата</SelectItem>
                      <SelectItem value="per_km">За километр</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editAddress">Адрес</Label>
                  <Input 
                    id="editAddress" 
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editLicenseNumber">Номер ВУ</Label>
                    <Input 
                      id="editLicenseNumber" 
                      value={editForm.licenseNumber}
                      onChange={(e) => setEditForm({...editForm, licenseNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editLicenseExpiry">Действительно до</Label>
                    <Input 
                      id="editLicenseExpiry" 
                      type="date"
                      value={editForm.licenseExpiry}
                      onChange={(e) => setEditForm({...editForm, licenseExpiry: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveChanges}>
                  Сохранить изменения
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* Личные данные */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarFallback className="text-lg">
                      {driver.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl">{driver.name}</h3>
                    <div className="flex items-center mt-1">
                      {getStatusBadge(driver.status)}
                      <span className="ml-2 text-sm text-muted-foreground">
                        В системе с {new Date(driver.joinDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{driver.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Опыт: {driver.experience}</span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Номер ВУ</p>
                    <p className="font-medium">{driver.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Действительно до</p>
                    <p className="font-medium">{new Date(driver.licenseExpiry).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>

                {driver.currentVehicle && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Текущее ТС: {driver.currentVehicle}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Аналитика за месяц */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Аналитика за текущий месяц
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Route className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{driver.thisMonthTrips}</p>
                    <p className="text-sm text-muted-foreground">Рейсов</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{driver.thisMonthKm.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">км</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-2xl font-bold">{driver.thisMonthHours}</p>
                    <p className="text-sm text-muted-foreground">часов</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Wallet className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold">{driver.monthlyEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">₽</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Настройки зарплаты */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="w-5 h-5 mr-2" />
                  Оплата труда
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Тип расчета</p>
                  <p className="font-semibold">{getSalaryTypeText(driver.salaryType)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ставка</p>
                  <p className="font-semibold">{driver.hourlyRate} ₽/час</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Заработано в этом месяце</p>
                  <p className="text-lg font-bold text-green-600">
                    {driver.monthlyEarnings.toLocaleString()} ₽
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Общая статистика */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Общая статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Всего рейсов</span>
                  <span className="font-semibold">{driver.totalTrips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Средний рейтинг</span>
                  <span className="font-semibold">4.8 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Последний рейс</span>
                  <span className="font-semibold">Сегодня</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Статус</span>
                  {getStatusBadge(driver.status)}
                </div>
              </CardContent>
            </Card>

            {/* Быстрые действия */}
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Посмотреть отчеты
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Route className="w-4 h-4 mr-2" />
                  История рейсов
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="w-4 h-4 mr-2" />
                  Назначить ТС
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverProfile;