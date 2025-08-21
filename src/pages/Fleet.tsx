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
  Weight,
  RefreshCw,
  User
} from "lucide-react";

const Fleet = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDriverDialogOpen, setIsAssignDriverDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [assigningVehicle, setAssigningVehicle] = useState<any>(null);
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [newVehicle, setNewVehicle] = useState({
    model: "",
    licensePlate: "",
    type: "",
    fuelConsumption: "",
    capacity: ""
  });
  
  const [vehicles, setVehicles] = useState([
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
  ]);

  // Available drivers (in real app this would come from API)
  const [drivers] = useState([
    {
      id: 1,
      name: "Иванов Алексей Петрович",
      status: "Свободен"
    },
    {
      id: 2,
      name: "Петров Владимир Сергеевич", 
      status: "В рейсе"
    },
    {
      id: 3,
      name: "Сидоров Михаил Иванович",
      status: "Загрузка"
    },
    {
      id: 4,
      name: "Козлов Дмитрий Александрович",
      status: "Свободен"
    },
    {
      id: 5,
      name: "Морозов Андрей Викторович",
      status: "Отпуск"
    }
  ]);

  const availableDrivers = drivers.filter(d => d.status === "Свободен");

  const handleAddVehicle = () => {
    if (newVehicle.model && newVehicle.licensePlate && newVehicle.type) {
      const vehicle = {
        id: vehicles.length + 1,
        model: newVehicle.model,
        licensePlate: newVehicle.licensePlate,
        type: newVehicle.type,
        fuelConsumption: parseFloat(newVehicle.fuelConsumption) || 0,
        capacity: parseInt(newVehicle.capacity) || 0,
        status: "Доступна",
        driver: null
      };
      
      setVehicles([...vehicles, vehicle]);
      setNewVehicle({ model: "", licensePlate: "", type: "", fuelConsumption: "", capacity: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditVehicle = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setNewVehicle({
      model: vehicle.model,
      licensePlate: vehicle.licensePlate,
      type: vehicle.type,
      fuelConsumption: vehicle.fuelConsumption.toString(),
      capacity: vehicle.capacity.toString()
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateVehicle = () => {
    if (editingVehicle && newVehicle.model && newVehicle.licensePlate && newVehicle.type) {
      const updatedVehicles = vehicles.map(v => 
        v.id === editingVehicle.id 
          ? {
              ...v,
              model: newVehicle.model,
              licensePlate: newVehicle.licensePlate,
              type: newVehicle.type,
              fuelConsumption: parseFloat(newVehicle.fuelConsumption) || 0,
              capacity: parseInt(newVehicle.capacity) || 0
            }
          : v
      );
      
      setVehicles(updatedVehicles);
      setNewVehicle({ model: "", licensePlate: "", type: "", fuelConsumption: "", capacity: "" });
      setEditingVehicle(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteVehicle = (vehicleId: number) => {
    setVehicles(vehicles.filter(v => v.id !== vehicleId));
  };

  const handleRefresh = () => {
    // Здесь можно добавить логику обновления данных с сервера
    console.log("Обновление списка транспортных средств");
  };

  const handleAssignDriver = (vehicle: any) => {
    setAssigningVehicle(vehicle);
    setSelectedDriverId("");
    setIsAssignDriverDialogOpen(true);
  };

  const handleConfirmAssignDriver = () => {
    if (assigningVehicle && selectedDriverId) {
      const selectedDriver = drivers.find(d => d.id.toString() === selectedDriverId);
      if (selectedDriver) {
        const updatedVehicles = vehicles.map(v => 
          v.id === assigningVehicle.id 
            ? { ...v, driver: selectedDriver.name }
            : v
        );
        setVehicles(updatedVehicles);
        setIsAssignDriverDialogOpen(false);
        setAssigningVehicle(null);
        setSelectedDriverId("");
      }
    }
  };

  const handleRemoveDriver = () => {
    if (assigningVehicle) {
      const updatedVehicles = vehicles.map(v => 
        v.id === assigningVehicle.id 
          ? { ...v, driver: null }
          : v
      );
      setVehicles(updatedVehicles);
      setIsAssignDriverDialogOpen(false);
      setAssigningVehicle(null);
      setSelectedDriverId("");
    }
  };

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
                  <Input 
                    id="model" 
                    placeholder="КамАЗ 5490" 
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="licensePlate">Госномер</Label>
                  <Input 
                    id="licensePlate" 
                    placeholder="А123БВ199" 
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Тип ТС</Label>
                  <Select value={newVehicle.type} onValueChange={(value) => setNewVehicle({...newVehicle, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      <SelectItem value="Седельный тягач">Седельный тягач</SelectItem>
                      <SelectItem value="Бортовой">Бортовой</SelectItem>
                      <SelectItem value="Фургон">Фургон</SelectItem>
                      <SelectItem value="Цистерна">Цистерна</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fuelConsumption">Расход топлива (л/100км)</Label>
                  <Input 
                    id="fuelConsumption" 
                    type="number" 
                    placeholder="28.5" 
                    value={newVehicle.fuelConsumption}
                    onChange={(e) => setNewVehicle({...newVehicle, fuelConsumption: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Грузоподъёмность (кг)</Label>
                  <Input 
                    id="capacity" 
                    type="number" 
                    placeholder="20000" 
                    value={newVehicle.capacity}
                    onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddVehicle}>
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Vehicle Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Редактировать транспортное средство</DialogTitle>
                <DialogDescription>
                  Измените информацию о ТС
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editModel">Модель</Label>
                  <Input 
                    id="editModel" 
                    placeholder="КамАЗ 5490" 
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editLicensePlate">Госномер</Label>
                  <Input 
                    id="editLicensePlate" 
                    placeholder="А123БВ199" 
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editType">Тип ТС</Label>
                  <Select value={newVehicle.type} onValueChange={(value) => setNewVehicle({...newVehicle, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      <SelectItem value="Седельный тягач">Седельный тягач</SelectItem>
                      <SelectItem value="Бортовой">Бортовой</SelectItem>
                      <SelectItem value="Фургон">Фургон</SelectItem>
                      <SelectItem value="Цистерна">Цистерна</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editFuelConsumption">Расход топлива (л/100км)</Label>
                  <Input 
                    id="editFuelConsumption" 
                    type="number" 
                    placeholder="28.5" 
                    value={newVehicle.fuelConsumption}
                    onChange={(e) => setNewVehicle({...newVehicle, fuelConsumption: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editCapacity">Грузоподъёмность (кг)</Label>
                  <Input 
                    id="editCapacity" 
                    type="number" 
                    placeholder="20000" 
                    value={newVehicle.capacity}
                    onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleUpdateVehicle}>
                  Сохранить
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Assign Driver Dialog */}
          <Dialog open={isAssignDriverDialogOpen} onOpenChange={setIsAssignDriverDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {assigningVehicle?.driver ? "Изменить водителя" : "Назначить водителя"}
                </DialogTitle>
                <DialogDescription>
                  {assigningVehicle?.driver 
                    ? `Измените водителя для ТС ${assigningVehicle?.model} (${assigningVehicle?.licensePlate}). Текущий водитель: ${assigningVehicle?.driver}`
                    : `Выберите водителя для транспортного средства ${assigningVehicle?.model} (${assigningVehicle?.licensePlate})`
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {assigningVehicle?.driver && (
                  <div className="grid gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full text-destructive hover:text-destructive"
                      onClick={handleRemoveDriver}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Убрать назначение
                    </Button>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="driverSelect">Доступные водители</Label>
                  <Select value={selectedDriverId} onValueChange={setSelectedDriverId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите водителя" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      {availableDrivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.name}
                        </SelectItem>
                      ))}
                      {availableDrivers.length === 0 && (
                        <SelectItem value="" disabled>
                          Нет доступных водителей
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAssignDriverDialogOpen(false)}>
                  Отмена
                </Button>
                <Button 
                  onClick={handleConfirmAssignDriver}
                  disabled={!selectedDriverId || availableDrivers.length === 0}
                >
                  {assigningVehicle?.driver ? "Изменить" : "Назначить"}
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
                  <p className="text-2xl font-bold">{vehicles.length}</p>
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
                  <p className="text-2xl font-bold text-success">{vehicles.filter(v => v.status === "Доступна").length}</p>
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
                  <p className="text-2xl font-bold text-primary">{vehicles.filter(v => v.status === "В рейсе").length}</p>
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
                  <p className="text-2xl font-bold text-warning">{vehicles.filter(v => v.status === "На ТО").length}</p>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>Список транспортных средств</span>
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
                  Управляйте информацией о ваших ТС
                </CardDescription>
              </div>
            </div>
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
                     <TableCell>
                       {vehicle.driver ? (
                         <div className="flex items-center space-x-2">
                           <div className="flex items-center">
                             <User className="w-4 h-4 mr-1 text-muted-foreground" />
                             {vehicle.driver}
                           </div>
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => handleAssignDriver(vehicle)}
                             className="text-xs"
                           >
                             <Edit className="w-3 h-3" />
                           </Button>
                         </div>
                       ) : (
                         <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => handleAssignDriver(vehicle)}
                           className="text-xs"
                         >
                           <User className="w-3 h-3 mr-1" />
                           Назначить
                         </Button>
                       )}
                     </TableCell>
                     <TableCell>
                       <div className="flex space-x-2">
                         <Button 
                           variant="ghost" 
                           size="sm"
                           onClick={() => navigate(`/fleet/${vehicle.id}`)}
                           title="Профиль автомобиля"
                         >
                           <Truck className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm"
                           onClick={() => handleEditVehicle(vehicle)}
                         >
                           <Edit className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className="text-destructive hover:text-destructive"
                           onClick={() => handleDeleteVehicle(vehicle.id)}
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

export default Fleet;