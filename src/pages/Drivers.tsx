import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Users,
  Phone,
  Coins,
  RefreshCw,
  Eye,
  User
} from "lucide-react";

const Drivers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<any>(null);
  const [newDriver, setNewDriver] = useState({
    fullName: "",
    phone: "",
    hourlyRate: "",
    experience: ""
  });

  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Иванов Алексей Петрович",
      phone: "+7 (999) 123-45-67",
      hourlyRate: 800,
      status: "В рейсе",
      currentVehicle: "КамАЗ 5490 (А123БВ199)",
      totalTrips: 156,
      experience: "8 лет"
    },
    {
      id: 2,
      name: "Петров Владимир Сергеевич",
      phone: "+7 (999) 234-56-78",
      hourlyRate: 750,
      status: "В рейсе",
      currentVehicle: "МАЗ 6430 (В456ГД777)",
      totalTrips: 203,
      experience: "12 лет"
    },
    {
      id: 3,
      name: "Сидоров Михаил Иванович",
      phone: "+7 (999) 345-67-89",
      hourlyRate: 900,
      status: "Загрузка",
      currentVehicle: "Volvo FH16 (С789ЕЖ199)",
      totalTrips: 89,
      experience: "5 лет"
    },
    {
      id: 4,
      name: "Козлов Дмитрий Александрович",
      phone: "+7 (999) 456-78-90",
      hourlyRate: 700,
      status: "Свободен",
      currentVehicle: null,
      totalTrips: 267,
      experience: "15 лет"
    },
    {
      id: 5,
      name: "Морозов Андрей Викторович",
      phone: "+7 (999) 567-89-01",
      hourlyRate: 825,
      status: "Отпуск",
      currentVehicle: null,
      totalTrips: 124,
      experience: "7 лет"
    }
  ]);

  const handleAddDriver = () => {
    if (newDriver.fullName && newDriver.phone && newDriver.hourlyRate) {
      const driver = {
        id: drivers.length + 1,
        name: newDriver.fullName,
        phone: newDriver.phone,
        hourlyRate: parseInt(newDriver.hourlyRate) || 0,
        status: "Свободен",
        currentVehicle: null,
        totalTrips: 0,
        experience: newDriver.experience || "0 лет"
      };
      
      setDrivers([...drivers, driver]);
      setNewDriver({ fullName: "", phone: "", hourlyRate: "", experience: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditDriver = (driver: any) => {
    setEditingDriver(driver);
    setNewDriver({
      fullName: driver.name,
      phone: driver.phone,
      hourlyRate: driver.hourlyRate.toString(),
      experience: driver.experience
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateDriver = () => {
    if (editingDriver && newDriver.fullName && newDriver.phone && newDriver.hourlyRate) {
      const updatedDrivers = drivers.map(d => 
        d.id === editingDriver.id 
          ? {
              ...d,
              name: newDriver.fullName,
              phone: newDriver.phone,
              hourlyRate: parseInt(newDriver.hourlyRate) || 0,
              experience: newDriver.experience
            }
          : d
      );
      
      setDrivers(updatedDrivers);
      setNewDriver({ fullName: "", phone: "", hourlyRate: "", experience: "" });
      setEditingDriver(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteDriver = (driverId: number) => {
    setDrivers(drivers.filter(d => d.id !== driverId));
  };

  const handleRefresh = () => {
    // Здесь можно добавить логику обновления данных с сервера
    console.log("Обновление списка водителей");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Свободен":
        return <Badge className="bg-success text-success-foreground">Свободен</Badge>;
      case "В рейсе":
        return <Badge className="bg-primary text-primary-foreground">В рейсе</Badge>;
      case "Загрузка":
        return <Badge className="bg-warning text-warning-foreground">Загрузка</Badge>;
      case "Отпуск":
        return <Badge variant="secondary">Отпуск</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.phone.includes(searchQuery) ||
    driver.currentVehicle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableDrivers = drivers.filter(d => d.status === "Свободен").length;
  const busyDrivers = drivers.filter(d => d.status === "В рейсе" || d.status === "Загрузка").length;
  const unavailableDrivers = drivers.filter(d => d.status === "Отпуск").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Управление водителями</h1>
            <p className="text-muted-foreground">
              Управляйте информацией о водителях вашей компании
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-elegant">
                <Plus className="w-4 h-4 mr-2" />
                Добавить водителя
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Добавить нового водителя</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом водителе
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">ФИО</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Иванов Иван Иванович" 
                    value={newDriver.fullName}
                    onChange={(e) => setNewDriver({...newDriver, fullName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input 
                    id="phone" 
                    placeholder="+7 (999) 123-45-67" 
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hourlyRate">Ставка за час (₽)</Label>
                  <Input 
                    id="hourlyRate" 
                    type="number" 
                    placeholder="800" 
                    value={newDriver.hourlyRate}
                    onChange={(e) => setNewDriver({...newDriver, hourlyRate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="experience">Опыт работы</Label>
                  <Input 
                    id="experience" 
                    placeholder="5 лет" 
                    value={newDriver.experience}
                    onChange={(e) => setNewDriver({...newDriver, experience: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddDriver}>
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Driver Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Редактировать водителя</DialogTitle>
                <DialogDescription>
                  Измените информацию о водителе
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editFullName">ФИО</Label>
                  <Input 
                    id="editFullName" 
                    placeholder="Иванов Иван Иванович" 
                    value={newDriver.fullName}
                    onChange={(e) => setNewDriver({...newDriver, fullName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editPhone">Номер телефона</Label>
                  <Input 
                    id="editPhone" 
                    placeholder="+7 (999) 123-45-67" 
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editHourlyRate">Ставка за час (₽)</Label>
                  <Input 
                    id="editHourlyRate" 
                    type="number" 
                    placeholder="800" 
                    value={newDriver.hourlyRate}
                    onChange={(e) => setNewDriver({...newDriver, hourlyRate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editExperience">Опыт работы</Label>
                  <Input 
                    id="editExperience" 
                    placeholder="5 лет" 
                    value={newDriver.experience}
                    onChange={(e) => setNewDriver({...newDriver, experience: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleUpdateDriver}>
                  Сохранить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Всего водителей</p>
                  <p className="text-2xl font-bold">{drivers.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Свободны</p>
                  <p className="text-2xl font-bold text-success">{availableDrivers}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Users className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">В работе</p>
                  <p className="text-2xl font-bold text-primary">{busyDrivers}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Недоступны</p>
                  <p className="text-2xl font-bold text-warning">{unavailableDrivers}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Users className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drivers Table */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>Список водителей</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRefresh}
                    className="ml-2 p-1 h-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  Управляйте информацией о ваших водителях
                </CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, телефону или ТС..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Ставка</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Текущее ТС</TableHead>
                  <TableHead>Рейсов</TableHead>
                  <TableHead>Опыт</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-muted-foreground" />
                        {driver.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Coins className="w-4 h-4 mr-1 text-muted-foreground" />
                        {driver.hourlyRate} ₽/час
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell className="max-w-40">
                      {driver.currentVehicle ? (
                        <span className="text-sm">{driver.currentVehicle}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{driver.totalTrips}</TableCell>
                    <TableCell>{driver.experience}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/drivers/${driver.id}`)}
                          title="Посмотреть профиль"
                        >
                          <User className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteDriver(driver.id)}
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Drivers;