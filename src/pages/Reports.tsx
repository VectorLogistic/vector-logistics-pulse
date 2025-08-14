import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download,
  DollarSign,
  Fuel,
  Calendar,
  FileText
} from "lucide-react";

const Reports = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const salaryData = [
    {
      driver: "Иванов А.П.",
      trips: 12,
      workingHours: 96,
      hourlyRate: 800,
      totalSalary: 76800,
      bonuses: 5000
    },
    {
      driver: "Петров В.С.",
      trips: 15,
      workingHours: 120,
      hourlyRate: 750,
      totalSalary: 90000,
      bonuses: 7500
    },
    {
      driver: "Сидоров М.И.",
      trips: 8,
      workingHours: 64,
      hourlyRate: 900,
      totalSalary: 57600,
      bonuses: 3200
    },
    {
      driver: "Козлов Д.А.",
      trips: 18,
      workingHours: 144,
      hourlyRate: 700,
      totalSalary: 100800,
      bonuses: 9000
    }
  ];

  const fuelData = [
    {
      vehicle: "КамАЗ 5490 (А123БВ199)",
      distance: 3420,
      fuelConsumption: 28.5,
      totalFuel: 975,
      fuelCost: 58500,
      trips: 12
    },
    {
      vehicle: "МАЗ 6430 (В456ГД777)",
      distance: 4250,
      fuelConsumption: 32.0,
      totalFuel: 1360,
      fuelCost: 81600,
      trips: 15
    },
    {
      vehicle: "Volvo FH16 (С789ЕЖ199)",
      distance: 2150,
      fuelConsumption: 26.8,
      totalFuel: 576,
      fuelCost: 34560,
      trips: 8
    },
    {
      vehicle: "Mercedes Actros (К345ЛМ777)",
      distance: 4680,
      fuelConsumption: 24.5,
      totalFuel: 1147,
      fuelCost: 68820,
      trips: 18
    }
  ];

  const totalSalaryExpenses = salaryData.reduce((sum, driver) => sum + driver.totalSalary + driver.bonuses, 0);
  const totalFuelExpenses = fuelData.reduce((sum, vehicle) => sum + vehicle.fuelCost, 0);
  const totalDistance = fuelData.reduce((sum, vehicle) => sum + vehicle.distance, 0);
  const totalTrips = salaryData.reduce((sum, driver) => sum + driver.trips, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Отчёты и аналитика</h1>
            <p className="text-muted-foreground">
              Анализируйте эффективность работы вашего автопарка
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Фильтры отчётов</span>
            </CardTitle>
            <CardDescription>
              Настройте параметры для генерации отчётов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Дата с</Label>
                <Input 
                  id="dateFrom" 
                  type="date" 
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">Дата по</Label>
                <Input 
                  id="dateTo" 
                  type="date" 
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Водитель</Label>
                <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все водители" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все водители</SelectItem>
                    <SelectItem value="ivanov">Иванов А.П.</SelectItem>
                    <SelectItem value="petrov">Петров В.С.</SelectItem>
                    <SelectItem value="sidorov">Сидоров М.И.</SelectItem>
                    <SelectItem value="kozlov">Козлов Д.А.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ТС</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все ТС" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все ТС</SelectItem>
                    <SelectItem value="kamaz">КамАЗ 5490</SelectItem>
                    <SelectItem value="maz">МАЗ 6430</SelectItem>
                    <SelectItem value="volvo">Volvo FH16</SelectItem>
                    <SelectItem value="mercedes">Mercedes Actros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  Обновить отчёт
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Расходы на зарплату</p>
                  <p className="text-2xl font-bold">₽{totalSalaryExpenses.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Расходы на топливо</p>
                  <p className="text-2xl font-bold">₽{totalFuelExpenses.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Fuel className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Общий пробег</p>
                  <p className="text-2xl font-bold">{totalDistance.toLocaleString()} км</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Всего рейсов</p>
                  <p className="text-2xl font-bold">{totalTrips}</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="salary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="salary">Расчёт зарплаты</TabsTrigger>
            <TabsTrigger value="fuel">Расход топлива</TabsTrigger>
          </TabsList>

          <TabsContent value="salary">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Расчёт зарплаты водителей</CardTitle>
                    <CardDescription>
                      Отчёт по заработной плате за выбранный период
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Водитель</TableHead>
                      <TableHead>Рейсов</TableHead>
                      <TableHead>Часов</TableHead>
                      <TableHead>Ставка</TableHead>
                      <TableHead>Базовая зарплата</TableHead>
                      <TableHead>Премии</TableHead>
                      <TableHead>Итого к выплате</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryData.map((driver, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{driver.driver}</TableCell>
                        <TableCell>{driver.trips}</TableCell>
                        <TableCell>{driver.workingHours} ч</TableCell>
                        <TableCell>₽{driver.hourlyRate}/ч</TableCell>
                        <TableCell>₽{driver.totalSalary.toLocaleString()}</TableCell>
                        <TableCell>₽{driver.bonuses.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">
                          ₽{(driver.totalSalary + driver.bonuses).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fuel">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Расход топлива по транспорту</CardTitle>
                    <CardDescription>
                      Отчёт по расходу и стоимости топлива за период
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Транспортное средство</TableHead>
                      <TableHead>Пробег</TableHead>
                      <TableHead>Расход л/100км</TableHead>
                      <TableHead>Потрачено топлива</TableHead>
                      <TableHead>Стоимость топлива</TableHead>
                      <TableHead>Рейсов</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelData.map((vehicle, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{vehicle.vehicle}</TableCell>
                        <TableCell>{vehicle.distance.toLocaleString()} км</TableCell>
                        <TableCell>{vehicle.fuelConsumption} л</TableCell>
                        <TableCell>{vehicle.totalFuel} л</TableCell>
                        <TableCell>₽{vehicle.fuelCost.toLocaleString()}</TableCell>
                        <TableCell>{vehicle.trips}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Section */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Экспорт отчётов</span>
            </CardTitle>
            <CardDescription>
              Скачайте отчёты в различных форматах
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Общий отчёт (PDF)
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Данные для 1С (XML)
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Аналитика (Excel)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;