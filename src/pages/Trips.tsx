import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  MapPin,
  Calendar,
  Check,
  Clock
} from "lucide-react";

const Trips = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const trips = [
    {
      id: "TRP-001",
      route: "Москва → Санкт-Петербург",
      date: "2024-12-15",
      time: "08:00",
      driver: "Иванов А.П.",
      vehicle: "КамАЗ 5490 (А123БВ199)",
      status: "В пути",
      distance: 635,
      estimatedArrival: "15:30"
    },
    {
      id: "TRP-002",
      route: "Екатеринбург → Новосибирск",
      date: "2024-12-15",
      time: "06:00",
      driver: "Петров В.С.",
      vehicle: "МАЗ 6430 (В456ГД777)",
      status: "В пути",
      distance: 1777,
      estimatedArrival: "Завтра 14:00"
    },
    {
      id: "TRP-003",
      route: "Казань → Ростов-на-Дону",
      date: "2024-12-15",
      time: "14:00",
      driver: "Сидоров М.И.",
      vehicle: "Volvo FH16 (С789ЕЖ199)",
      status: "Загрузка",
      distance: 1134,
      estimatedArrival: "Завтра 08:00"
    },
    {
      id: "TRP-004",
      route: "Тула → Воронеж",
      date: "2024-12-14",
      time: "10:00",
      driver: "Козлов Д.А.",
      vehicle: "Mercedes Actros (К345ЛМ777)",
      status: "Завершён",
      distance: 394,
      estimatedArrival: "17:30"
    },
    {
      id: "TRP-005",
      route: "Самара → Уфа",
      date: "2024-12-16",
      time: "09:00",
      driver: "Морозов А.В.",
      vehicle: "Scania R500 (Е012ЗИ199)",
      status: "Запланирован",
      distance: 458,
      estimatedArrival: "16:45"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Запланирован":
        return <Badge variant="secondary">Запланирован</Badge>;
      case "Загрузка":
        return <Badge className="bg-warning text-warning-foreground">Загрузка</Badge>;
      case "В пути":
        return <Badge className="bg-primary text-primary-foreground">В пути</Badge>;
      case "Завершён":
        return <Badge className="bg-success text-success-foreground">Завершён</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredTrips = trips.filter(trip =>
    trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTrips = trips.filter(t => t.status === "В пути" || t.status === "Загрузка").length;
  const plannedTrips = trips.filter(t => t.status === "Запланирован").length;
  const completedTrips = trips.filter(t => t.status === "Завершён").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Управление рейсами</h1>
            <p className="text-muted-foreground">
              Планируйте и отслеживайте рейсы вашего автопарка
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-elegant">
                <Plus className="w-4 h-4 mr-2" />
                Создать рейс
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Создать новый рейс</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом рейсе
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="routeFrom">Откуда</Label>
                  <Input id="routeFrom" placeholder="Москва" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="routeTo">Куда</Label>
                  <Input id="routeTo" placeholder="Санкт-Петербург" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tripDate">Дата</Label>
                    <Input id="tripDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tripTime">Время</Label>
                    <Input id="tripTime" type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="driver">Водитель</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите водителя" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ivanov">Иванов А.П.</SelectItem>
                      <SelectItem value="petrov">Петров В.С.</SelectItem>
                      <SelectItem value="sidorov">Сидоров М.И.</SelectItem>
                      <SelectItem value="kozlov">Козлов Д.А.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle">Транспортное средство</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите ТС" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kamaz">КамАЗ 5490 (А123БВ199)</SelectItem>
                      <SelectItem value="maz">МАЗ 6430 (В456ГД777)</SelectItem>
                      <SelectItem value="volvo">Volvo FH16 (С789ЕЖ199)</SelectItem>
                      <SelectItem value="mercedes">Mercedes Actros (К345ЛМ777)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Создать рейс
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
                  <p className="text-sm font-medium text-muted-foreground">Всего рейсов</p>
                  <p className="text-2xl font-bold">{trips.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Активные</p>
                  <p className="text-2xl font-bold text-primary">{activeTrips}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Запланированы</p>
                  <p className="text-2xl font-bold text-warning">{plannedTrips}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Завершены</p>
                  <p className="text-2xl font-bold text-success">{completedTrips}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Check className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trips Table */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Список рейсов</CardTitle>
            <CardDescription>
              Управляйте рейсами вашего автопарка
            </CardDescription>
            <div className="flex space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по номеру, маршруту или водителю..."
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
                  <TableHead>Номер</TableHead>
                  <TableHead>Маршрут</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Водитель</TableHead>
                  <TableHead>ТС</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Расстояние</TableHead>
                  <TableHead>Прибытие</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.id}</TableCell>
                    <TableCell className="max-w-40">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                        {trip.route}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{trip.date}</div>
                          <div className="text-xs text-muted-foreground">{trip.time}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{trip.driver}</TableCell>
                    <TableCell className="max-w-40">
                      <span className="text-sm">{trip.vehicle}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell>{trip.distance} км</TableCell>
                    <TableCell className="text-sm">{trip.estimatedArrival}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {trip.status === "Запланирован" && (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                        {trip.status === "В пути" && (
                          <Button variant="ghost" size="sm" className="text-success hover:text-success">
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
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

export default Trips;