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
  Truck,
  Fuel,
  Weight
} from "lucide-react";

const Fleet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const vehicles = [
    {
      id: 1,
      model: "КамАЗ 5490",
      licensePlate: "А123БВ199",
      type: "Седельный тягач",
      fuelConsumption: 28.5,
      capacity: 20000,
      status: "Доступна",
      driver: "Иванов А.П."
    },
    {
      id: 2,
      model: "МАЗ 6430",
      licensePlate: "В456ГД777",
      type: "Седельный тягач",
      fuelConsumption: 32.0,
      capacity: 18000,
      status: "В рейсе",
      driver: "Петров В.С."
    },
    {
      id: 3,
      model: "Volvo FH16",
      licensePlate: "С789ЕЖ199",
      type: "Седельный тягач",
      fuelConsumption: 26.8,
      capacity: 25000,
      status: "В рейсе",
      driver: "Сидоров М.И."
    },
    {
      id: 4,
      model: "Scania R500",
      licensePlate: "Е012ЗИ199",
      type: "Седельный тягач",
      fuelConsumption: 29.2,
      capacity: 22000,
      status: "На ТО",
      driver: null
    },
    {
      id: 5,
      model: "Mercedes Actros",
      licensePlate: "К345ЛМ777",
      type: "Бортовой",
      fuelConsumption: 24.5,
      capacity: 15000,
      status: "Доступна",
      driver: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Доступна":
        return <Badge className="bg-success text-success-foreground">Доступна</Badge>;
      case "В рейсе":
        return <Badge className="bg-primary text-primary-foreground">В рейсе</Badge>;
      case "На ТО":
        return <Badge className="bg-warning text-warning-foreground">На ТО</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driver?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Управление автопарком</h1>
            <p className="text-muted-foreground">
              Управляйте транспортными средствами вашей компании
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-elegant">
                <Plus className="w-4 h-4 mr-2" />
                Добавить машину
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Добавить транспортное средство</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом ТС
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="model">Модель</Label>
                  <Input id="model" placeholder="КамАЗ 5490" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="licensePlate">Госномер</Label>
                  <Input id="licensePlate" placeholder="А123БВ199" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Тип ТС</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">Седельный тягач</SelectItem>
                      <SelectItem value="flatbed">Бортовой</SelectItem>
                      <SelectItem value="van">Фургон</SelectItem>
                      <SelectItem value="tanker">Цистерна</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fuelConsumption">Расход топлива (л/100км)</Label>
                  <Input id="fuelConsumption" type="number" placeholder="28.5" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Грузоподъёмность (кг)</Label>
                  <Input id="capacity" type="number" placeholder="20000" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Добавить
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
                  <p className="text-sm font-medium text-muted-foreground">Всего машин</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Доступно</p>
                  <p className="text-2xl font-bold text-success">8</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <Truck className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">В рейсе</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">На ТО</p>
                  <p className="text-2xl font-bold text-warning">4</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Truck className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicles Table */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Список транспортных средств</CardTitle>
            <CardDescription>
              Управляйте информацией о ваших ТС
            </CardDescription>
            <div className="flex space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по модели, номеру или водителю..."
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
                  <TableHead>Модель</TableHead>
                  <TableHead>Госномер</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Расход</TableHead>
                  <TableHead>Грузоподъёмность</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Водитель</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.model}</TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Fuel className="w-4 h-4 mr-1 text-muted-foreground" />
                        {vehicle.fuelConsumption} л/100км
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Weight className="w-4 h-4 mr-1 text-muted-foreground" />
                        {vehicle.capacity.toLocaleString()} кг
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell>{vehicle.driver || "—"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
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

export default Fleet;